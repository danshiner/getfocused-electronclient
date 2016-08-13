const notifier = require('node-notifier');
const ipcRenderer = require('electron').ipcRenderer
const messageHandler = require('./messageHandler.js');

function notificationListener(mb){

  messageHandler.messageEmitter.on('new', function(message){
    // console.log('message: '+JSON.stringify(message));
    notifier.notify({
      'title': `Message from ${message.user}`,
      'message': message.text // COME BACK: you can also add icon, sound, timing
    });
    mb.tray.setImage(`./resources/images/iconUnread.png`);
  });

  messageHandler.messageEmitter.on('all-read', function(){
    mb.tray.setImage(`./resources/images/iconRead.png`);
  });
}

module.exports = {
  notificationListener : notificationListener
};
