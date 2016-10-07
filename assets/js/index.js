const remote = require('electron').remote;
const ipcRenderer = require('electron').ipcRenderer;

$(document).ready(function(){
  var window = remote.getCurrentWindow();
  if (window.isMaximized())
  {
     showRestoreBtn();
  }
  else
  {
    showMaximizeBtn();
  }

  $('#btn-minimize').on('click', function (){
     var window = remote.getCurrentWindow();
     window.minimize();
  });

  $('#btn-maximize').on('click', function (){
     var window = remote.getCurrentWindow();
     window.maximize();
     showRestoreBtn();
  });

  $('#btn-restore').on('click', function (){
     var window = remote.getCurrentWindow();
     window.unmaximize();
     showMaximizeBtn();
  });

  $('#btn-close').on('click', function () {
      ipcRenderer.send('close-main-window');
  });

  $('.titlebar').on('dblclick', function () {
    var window = remote.getCurrentWindow();
    if (window.isMaximized())
    {
      window.unmaximize();
      showMaximizeBtn();
    }
    else
    {
      window.maximize();
      showRestoreBtn();
    }
  });
});

function showMaximizeBtn()
{
  $('#btn-maximize').show();
  $('#btn-restore').hide();
}

function showRestoreBtn()
{
  $('#btn-maximize').hide();
  $('#btn-restore').show();
}
