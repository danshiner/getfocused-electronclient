// Core elements
const menubar = require('menubar')
const ipcMain = require('electron').ipcMain
const {app, BrowserWindow} = require('electron')

// Services
const websockets = require('./services/websockets.js')
const messages = require('./services/messages.js')


// Create menubar
let options = {
  index: `file://${__dirname}/views/main.html`,
};
var mb = menubar(options);

// Load the menubar
mb.on('ready', function ready () {

  // Start websockets client
  websockets.launchRtmClient();

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

})
