// Core elements
const menubar = require('menubar')
const ipcMain = require('electron').ipcMain
const {app, BrowserWindow} = require('electron')

// Services
const websockets = require('./services/websockets.js')
const notifications = require('./services/notifications.js');
// const messages = require('./services/messages.js')

// Create menubar
let options = {
  //note, menubar does not like file:// on the icon argument, but does on the index
  index: `file://${__dirname}/views/main.html`,
  width: 375,
  height: 300,
  icon: `${__dirname}/resources/images/iconUnread.png`
};
var mb = menubar(options);

// Load the menubar
mb.on('ready', function ready() {

  // Start websockets client
  websockets.launchRtmClient();

  // Start the notifications listener
  notifications.notificationListener();

  // IPC events send from renderer:

  // When show-prefs is sent, create a new browser window for preferences
  ipcMain.on('show-prefs', function(){
    let prefsWindow = new BrowserWindow({ width: 400, height: 400 });
    prefsWindow.loadURL(`file://${__dirname}/views/prefs.html`);

    iconPath = `./resources/images/iconRead.png`
    mb.tray.setImage(iconPath); // CONTRIBUTE: TELL EVERYONE THAT THISIS POSSIBLE
    // mb.emit('read');
  });

  // When quit is sent, quit the app.
  ipcMain.on('quit', function(){
    app.quit();
  });

})



mb.on('after-create-window', function(){
  // mb.setOption('icon', `${__dirname}/views/iconRead.png`)
  // mb.window.openDevTools();
});
