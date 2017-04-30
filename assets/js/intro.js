const remote = require('electron').remote;
const mainJS = remote.require('./main.js');
const user = remote.require('./user.js')
const ipcRenderer = require('electron').ipcRenderer;

const wallpaperInfo = {state: 0, bg: null, card: null};

$(document).ready(function() {

	$.get(mainJS.getApiURL() + '/ajax/get-session-state', function(_response){
		responseSessionState(_response);
	})
	.fail(() => showNoConnectionWarning());

	$('#btn-close').on('click', function () {
      ipcRenderer.send('close-main-window');
  });

});

function responseSessionState(_response)
{
	var window = remote.getCurrentWindow();

	window.setSize(mainJS.mainWindowOptions.width, mainJS.mainWindowOptions.height);
	window.center();

	if (_response.status == "auth")
	{
		mainJS.getCurrentUser().setState(user.userState.USER_AUTHENTICATE);
	}
	else if (_response.status == "guest")
	{
		mainJS.getCurrentUser().setState(user.userState.USER_GUEST);
	}

	//Background wallpaper
	$.get(mainJS.getApiURL() + '/ajax/get-wallpaper', function(_response, wallpaperInfo){
		responseRequestWallpaper(_response, 'bg');
	})
	.fail(() => showNoConnectionWarning());
	//Card wallpaper
	$.get(mainJS.getApiURL() + '/ajax/get-wallpaper?orientation=vertical', function(_response, wallpaperInfo){
		responseRequestWallpaper(_response, 'card');
	})
	.fail(() => showNoConnectionWarning());

}

function showNoConnectionWarning()
{
	$('#primary-img').attr('src', '../assets/images/error_no_connection.png');
	$('#primary-desc').text("Cannot connect to Anime4D.com");
	$('#joke-desc').text("Verify your Internet connection or retry later.");
	$('#loading-bar').hide();
	$('#btn-close').css("visibility", "visible");
}

function responseRequestWallpaper(_response, key)
{
	wallpaperInfo.state++;
	wallpaperInfo[key] = _response.url;

	if (wallpaperInfo.state == 2)
	{
		//ChangeURL with index
		mainJS.loadIndexPage(wallpaperInfo.bg, wallpaperInfo.card);
	}
}
