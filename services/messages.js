var messageEmitter = new (require('events').EventEmitter);

function addMessage(message){

  // mark the new message as unread (add unread element to slack message object)
  message.unread = true;

  // add message to messages array
  messages.push(message);

  // emit event to notifier to indicate that a new message has arrived
  messageEmitter.emit('new', message);
}

function deleteMessage(message){
  // delete messages[message.user] = message;
  // Causing problems!
}

var messages = [
  {"type":"message","channel":"C1YSPCUQK","user":"U1Z0MHRGB","text":"#now","ts":"1470790572.000044","team":"T1YU0S4TE",unread:true},
  {"type":"message","channel":"C1YSPCUQK","user":"U1Z0MHRGB","text":"hello #now","ts":"1470790519.000043","team":"T1YU0S4TE",unread:true}
]

module.exports = {
  addMessage : addMessage,
  deleteMessage : deleteMessage,
  messages : messages,
  messageEmitter : messageEmitter
};
