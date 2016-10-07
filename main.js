const electron = require('electron');
const path = require('path');
const {app, BrowserWindow, ipcMain} = electron;

const apiURL = "http://wallpaper4d.app"

let mainWindow = null;

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

			mainWindow = new BrowserWindow({
			width:330,
			height:430,
			frame:false,
			toolbar: false,
			resizable: false,
			show: false,
			center: true,
			backgroundColor: '#5B5B5B',
			title: 'Wallpaper4D',

			});

			mainWindow.loadURL(`file://${__dirname}/intro.html`);

			mainWindow.once('ready-to-show', function(){
				mainWindow.show()
				mainWindow.center()
			});

})
//IPC
ipcMain.on('close-main-window', function () {
    app.quit();
});

// EXPORTS -> TO MOVE?
exports.getApiURL = () => {
	return apiURL;
}

exports.changeURL = (url) => {
	mainWindow.webContents.loadURL(`file://${__dirname}` + url);
}

exports.trasformToMainWindow = () => {
	mainWindow.setSize(1368, 720);
	mainWindow.setMinimumSize(800, 600);
	mainWindow.setResizable(true);
	mainWindow.center()
}
