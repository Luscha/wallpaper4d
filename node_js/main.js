const electron = require('electron');
const {app, BrowserWindow, ipcMain} = electron;
const window = require('electron-window')
const user = require('./user.js')
global.appRoot = require('app-root-path');

const apiURL = "http://wallpaper4d.app"
const introWindowOptions = {
  width: 330,
  height: 430,
  frame: false,
  toolbar: false,
  resizable: false,
  show: false,
  center: true,
  backgroundColor: '#5B5B5B',
  title: 'Wallpaper4D',
}

const mainWindowOptions = {
  width: 1368,
  height: 720,
  minWidth: 800,
  minHeight: 600,
  frame: false,
  toolbar: false,
  show: false,
  center: true,
}

var currentUser = new user.User();
var mainWindow;

const shouldQuit = app.makeSingleInstance((commandLine, workingDirectory) => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore()
    mainWindow.focus()
  }
})

if (shouldQuit) {
  app.quit()
}

app.on('ready', () => {

		mainWindow = window.createWindow(introWindowOptions);

		mainWindow.showUrl(appRoot + '/browser_components/intro.html', null, () => {
      mainWindow.show();
			mainWindow.center();
    });
})
//IPC
ipcMain.on('close-main-window', function () {
    app.quit();
});

// EXPORTS -> TO MOVE?
function getApiURL() {
	return apiURL;
}

function getCurrentUser() {
	return currentUser;
}

function loadIndexPage(bgURL, cardURL) {
  const args = {
    bg: bgURL,
    card: cardURL,
  };

  tempWindow = window.createWindow(mainWindowOptions);
	tempWindow.showUrl(appRoot + '/browser_components/index.html', args, () => {
    mainWindow.unref();
    mainWindow.destroy();
    mainWindow = tempWindow;
    mainWindow.show();
    mainWindow.center();
    tempWindow = null;
  });
}

module.exports = {
  mainWindowOptions,
  getApiURL,
  getCurrentUser,
  loadIndexPage,
};
