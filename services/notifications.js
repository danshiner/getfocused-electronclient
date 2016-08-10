const notifier = require('node-notifier');

function notifyMain(message) {
  let keyword = /#now/i;

  if (keyword.test(message.text)) {

    notifier.notify({
      'title': `Message from ${message.user}`,
      'message': message.text // COME BACK: you can also add icon, sound, timing
    });

    console.log('Message:', message);

  };
}

module.exports = {
  notifyMain : notifyMain
};
