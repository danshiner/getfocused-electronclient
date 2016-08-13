const RtmClient = require('@slack/client').RtmClient;
const messageEmitter = new (require('events').EventEmitter);
const token = 'xoxp-66952888932-66962702693-67830999317-c6843cf293';

// For sending messages
const RTM_CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS.RTM;
var rtm = new RtmClient(token, {logLevel: 'verbose'});
//var token = process.env.SLACK_API_TOKEN || ''; COME BACK AND FIX THIS

//DB Files
const low = require('lowdb');
const fileAsync = require('lowdb/lib/file-async');
const db = low('db.json', { storage: require('lowdb/lib/file-async') });

// Create tables
db.defaults({ messages : [], user: {} }).value();

function launchRtmClient(){
  // Start the RTM client
  var RTM_EVENTS = require('@slack/client').RTM_EVENTS;
  rtm.start();

  // Capture rtm.start Payload
  var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
  rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, function(rtmStartData) {
    console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}.`);
  });

  // Create listener
  rtm.on(RTM_EVENTS.MESSAGE, function(message){
    let keyword = /#now/i;
    if (keyword.test(message.text)) {
      addMessage(message);
    };
  });
}

function sendMessage(messageData){
  // note: THIS IS VERY HACKY. I am opening another rtm.start() within the rtm to send a message, because my first RTM is throwing the error "message received on reconnect with no registered callback" which stops me from connecting. THIS IS V TEMPORARY! But it works for now. Also getting weird error, others too:  https://github.com/slackhq/node-slack-sdk/issues/251
  var rtm = new RtmClient(token, {logLevel: 'verbose'});
  rtm.start();

  rtm.on(RTM_CLIENT_EVENTS.RTM_CONNECTION_OPENED, function() {
    console.log('channel:'+messageData.channel+'text: '+messageData.text);

    rtm.sendMessage(messageData.text, messageData.channel, function(){
      console.log('message sent!')
    });
  });
}

function addMessage(message){
  // mark the new message as unread (add unread element to slack message object)
  message.unread = true;
  // add message to messages array
  db.get('messages')
    .push(message)
    .value();
  // emit event to notifier to indicate that a new message has arrived
  messageEmitter.emit('new', message);
}

// Come back and add multi-OS support when you have time https://github.com/mikaelbr/node-notifier#use-inside-tmux-session

module.exports = {
  launchRtmClient : launchRtmClient,
  addMessage : addMessage,
  sendMessage : sendMessage,
  messageEmitter : messageEmitter
};
