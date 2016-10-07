const mainJS = require('electron').remote.require('./main.js');
const ipcRenderer = require('electron').ipcRenderer;

$(document).ready(function(){

	$.get(mainJS.getApiURL() + '/ajax/get-session-state', function (_json)
	{
		mainJS.trasformToMainWindow();

		if (_json.status == "auth")
		{
			mainJS.changeURL('/index.html&auth');
		}
		else if (_json.status == "guest")
		{
			mainJS.changeURL('/index.html?guest');
		}
	})

	.fail(function()
	{
		$('#primary-img').attr('src', './assets/images/error_no_connection.png');
		$('#primary-desc').text("Cannot connect to Anime4D.com");
		$('#joke-desc').text("Verify your Internet connection or retry later.");
		$('#loading-bar').hide();
		$('#btn-close').css("visibility", "visible");
	});

	$('#btn-close').on('click', function () {
      ipcRenderer.send('close-main-window');
  });

});
