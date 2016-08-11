const RtmClient = require('@slack/client').RtmClient;
const messageEmitter = new (require('events').EventEmitter);
const token = 'xoxp-66952888932-66962702693-67830999317-c6843cf293';
//var token = process.env.SLACK_API_TOKEN || ''; COME BACK AND FIX THIS

var messages = [
  {"type":"message","channel":"C1YSPCUQK","user":"U1Z0MHRGB","text":"#now","ts":"1470790572.000044","team":"T1YU0S4TE",unread:true},
  {"type":"message","channel":"C1YSPCUQK","user":"U1Z0MHRGB","text":"hello #now","ts":"1470790519.000043","team":"T1YU0S4TE",unread:true}
];

function launchRtmClient(){
  // Create the RTM Client
  var rtm = new RtmClient(token, {logLevel: 'verbose'});
  var RTM_EVENTS = require('@slack/client').RTM_EVENTS;

  rtm.start();

  // Capture rtm.start Payload
  var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
  rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, function (rtmStartData) {
    console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}.`);
  });

  // Create events listener, including notifications
  rtm.on(RTM_EVENTS.MESSAGE, function(message){
    let keyword = /#now/i;
    if (keyword.test(message.text)) {
      addMessage(message);
    };
  });
}

function addMessage(message){
  // mark the new message as unread (add unread element to slack message object)
  message.unread = true;
  // add message to messages array
  messages.push(message);
  // emit event to notifier to indicate that a new message has arrived
  messageEmitter.emit('new', message);
}

// Come back and add multi-OS support when you have time https://github.com/mikaelbr/node-notifier#use-inside-tmux-session

module.exports = {
  launchRtmClient : launchRtmClient,
  addMessage : addMessage,
  messageEmitter : messageEmitter
};
