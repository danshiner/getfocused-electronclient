// Core elements
const menubar = require('menubar')
const ipcMain = require('electron').ipcMain
const {app, BrowserWindow} = require('electron')

// Services
const notifications = require('./services/notifications.js');
const messageHandler = require('./services/messageHandler.js');

// Create menubar
let options = {
  //note, menubar does not like file:// on the icon argument, but does on the index
  index: `file://${__dirname}/views/main.html`,
  width: 375,
  height: 300,
  icon: `${__dirname}/resources/images/iconRead.png`
};
var mb = menubar(options);

// Load the menubar
mb.on('ready', function ready() {

  // Start websockets client
  messageHandler.launchRtmClient();

  // Start the notifications listener
  notifications.notificationListener(mb);

  // IPC events send from renderer:

  // When show-prefs is sent, create a new browser window for preferences
  ipcMain.on('show-prefs', function(){
    let prefsWindow = new BrowserWindow({ width: 400, height: 400 });
    prefsWindow.loadURL(`file://${__dirname}/views/prefs.html`);
  });

  // When quit is sent, quit the app.
  ipcMain.on('quit', function(){
    app.quit();
  });

  ipcMain.on('change-icon', function(){
    mb.tray.setImage(`./resources/images/iconRead.png`);
  });

})

mb.on('after-show', function(){
  mb.tray.setImage(`./resources/images/iconRead.png`);
});
