$('head').append('<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">');;
function initialize_consent(key, privacy_url, text)
{
	localStorage.setItem('consent_key', key);
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

	var language_texts = {en: "We use cookies on our site to improve your experience, in accordance with our <a href='" + privacy_url + "'>privacy</a> policy.",
		es:"Utilizamos cookies en nuestro sitio para mejorar su experiencia, de acuerdo con nuestra política de privacidad.",//spanish
		fr:"Nous utilisons des cookies sur notre site pour améliorer votre expérience, conformément à notre politique de confidentialité.",//french
		de:"Wir verwenden Cookies auf unserer Website, um Ihre Erfahrung zu verbessern, in Übereinstimmung mit unseren Datenschutzbestimmungen.",//german
		pt:"Usamos cookies em nosso site para melhorar sua experiência, de acordo com nossa política de privacidade.",//portuguese
		hi:"हमारी गोपनीयता नीति के अनुसार, हम आपके अनुभव को बेहतर बनाने के लिए हमारी साइट पर कुकीज़ का उपयोग करते हैं।",//hindi
		ar:"نحن نستخدم ملفات تعريف الارتباط على موقعنا لتحسين تجربتك، وفقا لسياسة الخصوصية لدينا.",//arabic
		zh:"我们根据我们的隐私政策，在我们的网站上使用Cookie来改善您的体验。",//chinese
		ja:"私たちのプライバシーポリシーに従って、私たちはあなたの経験を向上させるために私たちのサイトでクッキーを使用します。",//japanese
		ko:"당사는 당사의 개인 정보 취급 방침에 따라 귀하의 경험을 향상시키기 위해 당사 사이트의 쿠키를 사용합니다.",//korean
		ru:"Мы используем файлы cookie на нашем сайте, чтобы улучшить ваш опыт в соответствии с нашей политикой конфиденциальности.",//russian
		it:"Usiamo cookie sul nostro sito per migliorare la tua esperienza, in conformità con la nostra politica sulla privacy.",//italian
		ms:"Kami menggunakan kuki di laman web kami untuk meningkatkan pengalaman anda, mengikut dasar privasi kami.",//malay
		bn:"আমরা আমাদের গোপনীয়তা নীতি অনুযায়ী, আপনার অভিজ্ঞতা উন্নত করতে আমাদের সাইটে কুকিজ ব্যবহার"//bengali
	}

	if(language_texts.hasOwnProperty(language))
	{
		language_text = language_texts[language];
	}

	if(text==null)
    {
    	text = language_text;
    }

	var html = "<div id='consent-wrapper' class='navbar-fixed-bottom' style='background-color: #f5f5f5; padding-top: 5px; text-align: center; position:fixed; bottom:0px; width: 100%;'><span id='consent_text' class='text-muted'>" + language_text + "  <button id='consent_button' type='button' class='btn'>OK</button></span><span style='margin-left: 5%;'><i class='fa fa-bolt' aria-hidden='true'></i> by <a href='https://www.predesto.com/consent'>predesto</a></span></div>"
	var consent = Cookies.get('privacy_consent');
	if(consent==undefined || consent!='true')
	{
		$("body").append(html);
	}
	else
	{
		console.log('privacy consent given - not displaying');
	}
	$("#consent_button").click(function()
	{
		Cookies.set('privacy_consent', 'true');
	    send_consent();
	    $("#consent-wrapper").hide();
	});
}
function send_consent()
{
	var key = localStorage.getItem('consent_key');
	if(key!=null)
	{
		$.ajax(
		{
	    type: "POST",
	    url: "https://consent.predesto.com/cookies/log_cookie_consent",
	    contentType: 'application/json',
	    dataType: 'json',
	    data: JSON.stringify({
		    "key": key
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
