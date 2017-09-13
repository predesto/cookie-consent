$('head').append('<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">');
function initialize_consent(token, privacy_url, text)
{
	localStorage.setItem('consent_token', token);
	var language_text = "";

	var language = navigator.languages && navigator.languages[0] || // Chrome / Firefox
         		   navigator.language ||   // All browsers
               	   navigator.userLanguage; // IE <= 10

    if(language!=null && language.indexOf("-")!=-1)
    {
    	var parts = language.split("-")
    	language = parts[0];//convert en-US to en
    }
    if (language!=null && language.indexOf("_")!=-1)
    {
    	var parts = language.split("_")
    	language = parts[0];//convert en-US to en
    }
	if(language==null)
	{
		language = 'en';
	}
	
	var language_texts = {en: "We use cookies on our site to improve your experience, according to our <a href='" + privacy_url + "'>privacy</a> policy.",
		es:,//spanish
		fr:"",//french
		de:"",//german
		pt:"",//portuguese
		hi:"",//
		ar:"",//arabic
		zh:"",//chinese
		ja:"",//japanese
		ko:"",//korean
		ru:"",//russian
		it:"",//italian
		ms:"",//malay
		bn:""//bengali
	}

	if(language_texts.hasOwnProperty(language))
	{
		language_text = language_texts[language];
	}

	if(text==null)
    {
    	text = language_text;
    }
	
	var html = "<div class='navbar-fixed-bottom' style='background-color: #f5f5f5;'><span id='consent_text' class='text-muted'>" + language_text + "<button id='consent_button' type='button' class='btn'>OK</button></span></div>"
	$("body").append(html);
	$("#consent_button").click(function()
	{
	    send_consent();
	});
}
function send_consent()
{
	var access_token = localStorage.getItem('consent_token');
	if(access_token!=null)
	{
		$.ajax(
		{
	    type: "POST",
	    url: "https://api.predesto.com/cookie_consent_log",
	    headers: {'Authorization': 'Bearer ' + access_token},
	    contentType: 'application/json',
	    dataType: 'json',
	    data: JSON.stringify({
		    "Record": {
		        "Data": new Date().getTime() / 1000
		    }
		}),
	    }).done(function(result)
	    {
	      console.log(result);
		});
	}
	else
	{
		console.log('Please initialize with a token before calling send_consent');
	}
}