const $ = require('../resources/jquery-3.1.0.min.js');
const ipcRenderer = require('electron').ipcRenderer

//DB Files
const low = require('lowdb')
const fileAsync = require('lowdb/lib/file-async')
const db = low('db.json', { storage: require('lowdb/lib/file-async') })


$(document).ready(function(){
  // Update the messages with the most recent version from the database.
  ipcRenderer.on('update', function(event, messages){
    $('#messages').empty();
    if (messages[0] == undefined){
      $('#messages').append(`<p class='empty'>No new messages.</p>`)
    }
    messages.forEach(function(message){
      $('#messages').append(`
        <div class="message" data-channel="${message.channel}" data-team="${message.team}" data-user="${message.user}" data-unread="${message.unread}">
          <div class="notification-icon">
            <img src="../resources/images/message_icon_slack.png" />
          </div>
          <div class="notification-text">
            <p style="font-weight:bold;">${message.user}</p>
            <p>${message.text}</p>
          </div>
          <div class="reply" style="display:none">
            <form>
              <textarea class="replybox" name="reply" placeholder="Hit enter to send"></textarea>
            </form>
          </div>
          <a class="mark-unread">Mark As Unread</a><a class="reply">Reply</a>
        </div>
      `);
    });
  });

  // Mark unreads in light blue
  $(document).on('ready', '.message', function(e){
    if ($(e.target).data().unread == 'true') {
      $(e.target).css({'background-color': 'blue'});
      // Not working yet!
    }
  })

  // When reply is clicked, toggle the reply box
  $(document).on('click', '.reply', function(e){
    replyDiv = $(e.target).prev().prev()
    if (replyDiv.css('display') == 'none') {
      replyDiv.slideDown('medium');
      sendMessage(replyDiv)
    } else {
      replyDiv.slideUp('medium');
    };
  });

  // When enter is pressed send the form
  function sendMessage(replyDiv){
    $(document).on('keypress', 'form', function(e){
      if(e.which == 13){
        e.preventDefault();
        let message = {
          text: $(':focus').first().val(),
          channel: $(':focus').parent().parent().parent().data().channel
        }
        ipcRenderer.send('send-message', message);
        replyDiv.slideUp('fast');
      };
    });
  }

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
