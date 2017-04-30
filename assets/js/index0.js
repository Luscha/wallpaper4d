$(document).ready(function(){

	$.get("http://localhost:8000/ajax/get_session_state", function (_json) {
		if (_json.status == "logged_in")
		{
			//$(".page-content").append('Welocome back'+_json.strName+'<br>');
		}
		else if (_json.status == "guest")
		{
			//$(".page-content").append('Authenticate yourself or register<br>');
		}
	})

	.fail(function() {
		//$(".page-content").append("XHR REQUEST FAILED.<br>");
		var $div = $('<div>', { id: 'login-card-container'});
		$div.hide();

		$('body').append($div);
		//$('body').append('<div id="mask"></div>');

		// $div.load('./html_elements/login_card.html', function() {
			// $($div).ready(function() {
				// $('#login-card').hide();
				// $div.show();
				// $('#login-card').css("z-index", 11);
				// $('#login-card').fadeIn(300);
			// });
		// });

		$div.load('./html_elements/welcome_back_card.html', function() {
			$($div).ready(function() {
				$('#welcome-card').hide();
				$div.show();
				$('#welcome-card').css("z-index", 11);
				$('#welcome-card').fadeIn(300);
			});
		});

		//$('#mask').css("z-index", 10);
		//$('#mask').fadeIn(300);

		//$('body').css("-webkit-filter", "blur(10px)");
		//$('body').css("filter", "blur(10px)");
	});
});
