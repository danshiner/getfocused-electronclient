const $ = require('../resources/jquery-3.1.0.min.js');
const ipcRenderer = require('electron').ipcRenderer

//DB Files
const low = require('lowdb')
const fileAsync = require('lowdb/lib/file-async')
const db = low('db.json', { storage: require('lowdb/lib/file-async') })


$(document).ready(function(){

  ipcRenderer.on('update', function(event, messages){
    $('#messages').empty();
    messages.forEach(function(message){
      $('#messages').append(`
        <div class="message" data-channel="${message.channel}" data-team="${message.team}" data-user="${message.user}">
          <p style="font-weight:bold;">${message.user}</p>
          <p>${message.text}</p>
          <a class="reply">Reply</a>
          <div class="reply">
            <form>
              <textarea class="replybox" name="reply">Hit enter to send.</textarea>
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      `);
    });

  });

  //slide box open
  //enter to send
  //after send, sending and sent confirmed, and then entire message disappears.

$(document).on('keypress', 'form', function(e){
  if(e.which == 13){
    e.preventDefault();
    let message = {
      text: $(':focus').first().val(),
      channel: $(':focus').parent().parent().parent().data().channel
    }
    // console.log('message: '+JSON.stringify(message))
    ipcRenderer.send('send-message', message);
  };
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
