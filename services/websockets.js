// Require the Slack API client (light wrapper on slack RTM API)
var RtmClient = require('@slack/client').RtmClient;
var token = 'xoxp-66952888932-66962702693-67830999317-c6843cf293'
//var token = process.env.SLACK_API_TOKEN || ''; COME BACK AND FIX THIS
let currentMessages = require('./messages.js');

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
      currentMessages.addMessage(message)
      console.log(currentMessages.messages); // not all messages are being stored!
    };
  });
}

// Come back and add multi-OS support when you have time https://github.com/mikaelbr/node-notifier#use-inside-tmux-session

module.exports = {
  launchRtmClient : launchRtmClient
};
