const remote = require('electron').remote;
const mainJS = remote.require('./main.js');
const user = remote.require('./user.js')
const ipcRenderer = require('electron').ipcRenderer;

$(document).ready(function(){
  if (remote.getCurrentWindow().isMaximized()) {
     showRestoreBtn();
  }
  else {
    showMaximizeBtn();
  }

  $('#btn-minimize').on('click', function (){
     remote.getCurrentWindow().minimize();
  });

  $('#btn-maximize').on('click', function (){
     remote.getCurrentWindow().maximize();
     showRestoreBtn();
  });

  $('#btn-restore').on('click', function (){
     remote.getCurrentWindow().unmaximize();
     showMaximizeBtn();
  });

  $('#btn-close').on('click', function () {
      ipcRenderer.send('close-main-window');
  });

  $('.titlebar').on('dblclick', function () {
    var win = remote.getCurrentWindow();
    if (win.isMaximized()) {
      win.unmaximize();
      showMaximizeBtn();
    }
    else {
      win.maximize();
      showRestoreBtn();
    }
  });
});

$(window).on('load', function() {
    $('.wallpaper-blur').css('background-image', 'url(' + mainJS.getApiURL() + window.__args__.bg + ')');
    $('.wallpaper').attr('src', mainJS.getApiURL() + window.__args__.bg);

    toggleMask();

    if (mainJS.getCurrentUser().getState() == user.userState.USER_GUEST) {
      showLoginCard(mainJS.getApiURL() + window.__args__.card);
    }
});

function showMaximizeBtn() {
  $('#btn-maximize').show();
  $('#btn-restore').hide();
}

function showRestoreBtn() {
  $('#btn-maximize').hide();
  $('#btn-restore').show();
}

function toggleMask() {
  if ($('.page-content').has('#mask').length){
      $('#mask').fadeOut(300, function(){
        $('.page-content').remove('#mask');
      });
  } else {
    $('.page-content').append('<div id="mask"></div>');
    $('#mask').css("z-index", 10);
    $('#mask').fadeIn(300);

    $('#mask').on('click', function () {
        toggleMask();
    });
  }
}

function showLoginCard(image)
{
  var $div = $('<div>', { id: 'card-container'});
  $div.hide();

  $('.page-content').append($div);

  $div.load('../browser_components/login_card.html', function() {
    $($div).ready(function() {
      $('#login-card').hide();
      $div.show();
      $('#login-card').css("z-index", 11);
      $('#login-card').css('background-image', 'url(' + image + ')');
      $('#login-card').fadeIn(300);
    });
  });
}
