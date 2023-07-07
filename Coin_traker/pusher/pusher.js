const Pusher = require("pusher");
const pusher = new Pusher({
    appId: "1606894",
    key: "036bd13585b46bf79463",
    secret: "de0b28a09b63ddd4c004",
    cluster: "ap2",
    useTLS: true
  });

  module.exports = pusher;
  