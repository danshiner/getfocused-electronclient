const notifier = require('node-notifier');
let currentMessages = require('./messages.js');
let unreadMessages = "";
const ipcRenderer = require('electron').ipcRenderer


function notificationListener(){
  currentMessages.messageEmitter.on('new', function(message){
    console.log('message: '+JSON.stringify(message));
    notifier.notify({
      'title': `Message from ${message.user}`,
      'message': message.text // COME BACK: you can also add icon, sound, timing
    });
  });
  // currentMessages.messageEmitter.on('status-change', function(){
  //   currentMessages.messages.forEach(function(message){
  //     if (message.unread === true) { menuBarIconChange('unread') }
  //     else { menuBarIconChange('read') }
  //   });
  // }
}
  // function menuBarIconChange(status){
  //   if (status === 'unread') {
  //     mb.setOption(icon, `file://${__dirname}/resources/images/iconUnread.png`)
  //   }
  //   else if (status === 'read') {
  //     mb.setOption(icon, `file://${__dirname}/resources/images/iconRead.png`)
  //   }
  // };

module.exports = {
  notificationListener : notificationListener
};
