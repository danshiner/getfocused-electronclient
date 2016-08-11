const $ = require('../resources/jquery-3.1.0.min.js');
const ipcRenderer = require('electron').ipcRenderer

$(document).ready(function(){

  console.log(currentMessages.messages);

  currentMessages.messages.forEach(function(message){
    $('#messages').append(`
      <div>
        <p style="font-weight:bold;">${message.user}</p>
        <p>${message.text}</p>
      </div>
      `);
  });

  $('#preferences').on('click', function(){
    ipcRenderer.send('show-prefs');
  });

  $('#quit').on('click', function(){
    ipcRenderer.send('quit');
  });

});


// Object
// channel
// :
// "C1YSPCUQK"
// team
// :
// "T1YU0S4TE"
// text
// :
// "#now"
// ts
// :
// "1470790572.000044"
// type
// :
// "message"
// user
// :
// "U1Z0MHRGB"
