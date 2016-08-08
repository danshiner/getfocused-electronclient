const ipcRenderer = require('electron').ipcRenderer

let preferences = document.getElementById('preferences');
let quit = document.getElementById('quit');

preferences.addEventListener('click', function(){
  ipcRenderer.send('show-prefs');
});

quit.addEventListener('click', function(){
  ipcRenderer.send('quit');
});
