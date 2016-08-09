// Creating the RTM Client

var RtmClient = require('@slack/client').RtmClient;

var token = 'xoxp-66952888932-66962702693-67830999317-c6843cf293'
//var token = process.env.SLACK_API_TOKEN || ''; COME BACK AND FIX THIS

var rtm = new RtmClient(token, {logLevel: 'debug'});
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;

rtm.start();

// Capturing rtm.start payload

var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;

rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, function (rtmStartData) {
  console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`);
});

// Messaging

rtm.on(RTM_EVENTS.MESSAGE, function handleRtmMessage(message) {

  new Notification('Title', { body: message.text });

  // let myNotification = new Notification('Title', {
  //   body: message.text
  // })

  // myNotification.onclick = () => {
  //   console.log('Notification clicked')
  // }

  console.log('Message:', message);

});


// const https = require('https');
// const WebSocketClient = require('websocket').client;
// const test_token = 'xoxp-66952888932-66962702693-67830999317-c6843cf293'
//
// let url = `https://slack.com/api/rtm.start?token=${test_token}`
//
// https.get(url, (res) => {
//   console.log('statusCode: ', res.statusCode);
//   console.log('headers: ', res.headers);
//
//   res.on('data', (d) => {
//       console.log(d);
//   });
//
// }).on('error', (e) => {
//   console.error(e);
// });
