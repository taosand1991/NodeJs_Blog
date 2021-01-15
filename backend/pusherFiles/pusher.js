const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1076906",
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: "eu",
  encrypted: true,
});

module.exports = pusher;
