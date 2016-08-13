// Core elements
const menubar = require('menubar')
const ipcMain = require('electron').ipcMain
const {app, BrowserWindow} = require('electron')

// Services
const notifications = require('./services/notifications.js');
const messageHandler = require('./services/messageHandler.js');

//DB Files
const low = require('lowdb');
const fileAsync = require('lowdb/lib/file-async');
const db = low('db.json', { storage: require('lowdb/lib/file-async') });

// const db = function(){
//   return low('db.json', { storage: require('lowdb/lib/file-async')})
// };


// Create menubar
let options = {
  //note, menubar does not like file:// on the icon argument, but does on the index
  index: `file://${__dirname}/views/main.html`,
  width: 375,
  height: 300,
  icon: `${__dirname}/resources/images/iconRead.png`,
  transparent: true,
  preloadWindow: true //Necessary so that messages are loaded as soon as app is opened.
};
// add   transparent: true for transparent BG


var mb = menubar(options);

// Load the menubar
mb.on('ready', function ready() {

  // STARTUP PROCESSES

  // Start websockets client
  messageHandler.launchRtmClient(db);
  // Start the notifications listener
  notifications.notificationListener(mb);
  // Load the messages from the db and send to the window
  // messages = db.get('messages').value();

  // IPC EVENTS SENT FROM RENDERERS

  // When show-prefs is received, create a new browser window for preferences
  ipcMain.on('show-prefs', function(){
    let prefsWindow = new BrowserWindow({ width: 400, height: 400 });
    prefsWindow.loadURL(`file://${__dirname}/views/prefs.html`);
  });
  // When quit is received, quit the app.
  ipcMain.on('quit', function(){
    app.quit();
  });
  // When send-message is received, send a message via messageHandler
  ipcMain.on('send-message', function(event, messageData){
    messageHandler.sendMessage(messageData);
  });


  // UPDATING MESSAGES IN MAIN WINDOW

  // Send the most recent version of messages every time the window is shown
  mb.on('show', function(){
    messages = db.get('messages').value();
    mb.window.webContents.send('update', messages);
    console.log(messages);
  });
  // Mark all messages as read after show
  mb.on('after-show', function(){
    //must use messageHandler.messageEmitter because cannot use mb.window.webContents.send to talk to notifications.js (only works on renderer processes)
    messageHandler.messageEmitter.emit('all-read');
  });

})
