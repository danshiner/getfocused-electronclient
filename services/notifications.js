const notifier = require('node-notifier');
const ipcRenderer = require('electron').ipcRenderer
const messageHandler = require('./messageHandler.js');
const path = require('path');

let animationFrame = 1
function notificationListener(mb){

  messageHandler.messageEmitter.on('new', function(message){
    notifier.notify({
      // Cheating because couldn't get users list in time. Fix this!
      // 'title': `Message from ${message.user}`,
      'title': `Slack Message from Dan`,
      'message': message.text,
      'icon': `./resources/images/notification_icon.png`
    });

    // Make the menubar app blink
    const mainLoopId = setInterval(animateIcon, 750);
    mb.tray.on('click', function(){ clearInterval(mainLoopId) });

    function animateIcon(){
      if (animationFrame == 1){
        mb.tray.setImage(`./resources/images/iconUnread.png`);
        animationFrame = 2;
      } else {
        mb.tray.setImage(`./resources/images/iconRead.png`);
        animationFrame = 1;
      }
    }

  });

  messageHandler.messageEmitter.on('all-read', function(){
    mb.tray.setImage(`./resources/images/iconRead.png`);
  });
}

module.exports = {
  notificationListener : notificationListener
};
