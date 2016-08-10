const menubar = require('menubar')
const ipcMain = require('electron').ipcMain
const {app, BrowserWindow} = require('electron') //note I need the app so that I can call app.quit(); --> maybe a cleaner way to do this

//1. SET ICON IMAGE

let options = {
  index: `file://${__dirname}/views/index.html`,
};

var mb = menubar(options);

mb.on('ready', function ready () {
  console.log('app is ready')

  // When there are unread messages, change the icon. When there are no unread messages, change it back.

  // When show-prefs is sent, create a new browser window for preferences
  ipcMain.on('show-prefs', function(){
    let prefsWindow = new BrowserWindow({
      width: 400,
      height: 400,
    });
    prefsWindow.loadURL(`file://${__dirname}/views/prefs.html`);
  });

  // When quit is sent, quit the app.
  ipcMain.on('quit', function(){
    app.quit();
  });


})
