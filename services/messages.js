function addMessage(message){
  currentMessages[message.user] = message;
}

function deleteMessage(message){
  delete currentMessages[message.user] = message;
}

var currentMessages = {
    'U1Z0MHRGB' :  {"type":"message","channel":"C1YSPCUQK","user":"U1Z0MHRGB","text":"#now","ts":"1470790572.000044","team":"T1YU0S4TE"},
    'U1Z0MHRGB' :  {"type":"message","channel":"C1YSPCUQK","user":"U1Z0MHRGB","text":"hello #now","ts":"1470790519.000043","team":"T1YU0S4TE"}
}

module.exports = {
  addMessage : addMessage,
  deleteMessage : deleteMessage,
  currentMessages : currentMessages
};


// VS EXPORT?
// sample message for reference {"type":"message","channel":"C1YSPCUQK","user":"U1Z0MHRGB","text":"#now","ts":"1470790572.000044","team":"T1YU0S4TE"}
