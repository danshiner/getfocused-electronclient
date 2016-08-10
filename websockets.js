// Creating the RTM Client

var RtmClient = require('@slack/client').RtmClient;

var token = 'xoxp-66952888932-66962702693-67830999317-c6843cf293'
const notifier = require('node-notifier');

//var token = process.env.SLACK_API_TOKEN || ''; COME BACK AND FIX THIS

var rtm = new RtmClient(token, {logLevel: 'debug'});
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;

rtm.start();

// Capturing rtm.start Payload

var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;

rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, function (rtmStartData) {
  console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`);
});

// Messaging, including notifications

rtm.on(RTM_EVENTS.MESSAGE, function handleRtmMessage(message) {

  let keyword = /#now/i;

  if (keyword.test(message.text)) {

    new Notification('Title', { body: message.text });
    notifier.notify({
      'title': `Message from ${message.user}`,
      'message': message.text // COME BACK: you can also add icon, sound, timing
    });
    // Come back and add multi-OS support when you have time https://github.com/mikaelbr/node-notifier#use-inside-tmux-session

  };

  console.log('Message:', message);

});
