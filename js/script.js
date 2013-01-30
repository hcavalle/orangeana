
//randomly grabs a question for pool of deep questions
function getDaq(callback){
	var max  = 14;
	var HTML_FILE_URL = 'daq.html';
	var rand = Math.floor(Math.random() * max)
	//alert("rand is:" + rand);
	if (checkCookieExists(rand) == null){ //check if question has already been viewed in this session via cookie
		for (i=0; i < max; i++){
			if (checkCookieExists(i) != null){
				//create a cookie with 1 - max, then if cookie exists, run through this until it finds one that doesn't. remove from this cookie once used.
				rand = i;
				break;
			}
			rand =null;
		}
	}
	//alert("rand changed to:" + rand);
	var daq;
	$.get(HTML_FILE_URL, function(data){ //ajax to insert question text into content
		//alert($.type(data));
		var lines = data.split('\n');
		if (rand != null){
			daq = lines[rand];
			$.cookie(rand, rand);
		}
		else{
			daq = "<p>you've read all the questions we've got! come back later and we'll have more for you...</p>"
		}
		//alert("type is: " + $.type(daq)+ "content is: " + daq);
	 	callback(daq, rand);
	});
}

//check if a cookie for the question randomly selected exists
function checkCookieExists(rand){
	var split = document.cookie.split(';');
	for (var i = 0; i < split.length; i++) {
			//alert("split " +i+ ":" +split[i]);
            var cookie_value = split[i].split('=');
            //alert("name value " +i+ ":" +cookie_value[0]);
            if(rand == cookie_value[0]){
				//alert("cookie exists for rand:" + rand);
				rand = null;
			}
	}
	//alert("cookie length:" + split.length);
	return rand;
}

$(document).ready(function() {
	$('#innercontent').hide();
	$('#innercontent').fadeIn('slow');
	
	var fbComment = '<div class="fb-comments" data-href="http://orangeana.cavallero.me" data-width="600" data-num-posts="2" data-colorscheme="dark"></div>';
	var fbScript = '<div id="fb-root"></div><script>(function(d, s, id) {  var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) return; js = d.createElement(s); js.id = id;js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";fjs.parentNode.insertBefore(js, fjs);} (document, "script", "facebook-jssdk"));</script>';
	$('#clickhere').click(function(){
		//alert("you clicked daq");
		$('#innercontent').fadeOut('slow');
		$('#textbox').fadeOut('slow', function(){
			var rand = getDaq(function(content, rand){
				//alert("content is" + content+"and rand is: "+rand);
				$('#textbox').html(content);
				$('#textbox').fadeIn('slow');
				if (rand === null){
					//alert('all done');
					$('#clickhere, .share').remove();
				}
			});
			$('.share').show()
		$('body').prepend(fbScript);
		$('.share').append(fbComment);
		
		$('#clickhere').html('<a href""><span>another Q</span></a>');
		
		$('#innercontent').fadeIn('slow');
		});
	});
	
	//mouseover for button
	$('#clickhere').hover(function(){
		$(this).css("box-shadow", "0px 0px 5px #888");
	}, function(){
		$(this).css("box-shadow", "none");
	});
	
	//ajax for about page
	$('#aboutnav').click(function(event){
		$('#innercontent').hide();
		$('#innercontent').empty();
		event.preventDefault();
		$('a').removeClass('active');
		$(this).addClass('active');
		$('#innercontent').load("about.html", function(response, status, xhr) {
		  if (status == "error") {
		    var msg = "Sorry but there was an error: ";
		    $("#error").html(msg + xhr.status + " " + xhr.statusText);
  			}
  		$('#innercontent').fadeIn('slow');
  		});
	});
	
	//ajax for purpose page
	$('#purposenav').click(function(event){
		$('#innercontent').hide();
		$('#innercontent').empty();
		event.preventDefault();
		$('a').removeClass('active');
		$(this).addClass('active');
		$('#innercontent').load("purpose.html", function(response, status, xhr) {
		  if (status == "error") {
		    var msg = "Sorry but there was an error: ";
		    $("#error").html(msg + xhr.status + " " + xhr.statusText);
  			}
  		$('#innercontent').fadeIn('slow');
  		});
	});
	
	//ajax for purpose page
	$('#hownav').click(function(event){
		$('#innercontent').hide();
		$('#innercontent').empty();
		event.preventDefault();
		$('a').removeClass('active');
		$(this).addClass('active');
		$('#innercontent').load("how.html", function(response, status, xhr) {
		  if (status == "error") {
		    var msg = "Sorry but there was an error: ";
		    $("#error").html(msg + xhr.status + " " + xhr.statusText);
  			}
  		$('#innercontent').fadeIn('slow');
  		});
	});
	
	//back to top
	$('#back-top').click(function () {
			$('body,html').animate({
				scrollTop: 0
			}, 800);
			return false;
		});
	
});


