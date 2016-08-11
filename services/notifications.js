const notifier = require('node-notifier');
let currentMessages = require('./messages.js');
const ipcRenderer = require('electron').ipcRenderer


function notificationListener(mb){

  currentMessages.messageEmitter.on('new', function(message){
    console.log('message: '+JSON.stringify(message));
    notifier.notify({
      'title': `Message from ${message.user}`,
      'message': message.text // COME BACK: you can also add icon, sound, timing
    });
    mb.tray.setImage(`./resources/images/iconUnread.png`);
  });

  currentMessages.messageEmitter.on('all-read', function(){
    mb.tray.setImage(`./resources/images/iconRead.png`);
  });

}

module.exports = {
  notificationListener : notificationListener
};
