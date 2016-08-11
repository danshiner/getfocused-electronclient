var messageEmitter = new (require('events').EventEmitter);

function addMessage(message){
  message.read = false;
  messages.push(message);
  // console.log('message.user: '+message.user);
  // console.log('message: '+JSON.stringify(messages));
  // console.log('messages: '+JSON.stringify(message));
  messageEmitter.emit('new', message);
  messageEmitter.emit('status-change');

}

function deleteMessage(message){
  // delete messages[message.user] = message;
  // Causing problems!
}

var messages = [
  {"type":"message","channel":"C1YSPCUQK","user":"U1Z0MHRGB","text":"#now","ts":"1470790572.000044","team":"T1YU0S4TE","unread":true},
  {"type":"message","channel":"C1YSPCUQK","user":"U1Z0MHRGB","text":"hello #now","ts":"1470790519.000043","team":"T1YU0S4TE","unread":true}
]

module.exports = {
  addMessage : addMessage,
  deleteMessage : deleteMessage,
  messages : messages,
  messageEmitter : messageEmitter
};


// VS EXPORT?
// sample message for reference {"type":"message","channel":"C1YSPCUQK","user":"U1Z0MHRGB","text":"#now","ts":"1470790572.000044","team":"T1YU0S4TE"}
