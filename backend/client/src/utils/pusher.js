import Pusher from "pusher-js";

const pusher = new Pusher("1d35458c15229178bcc9", {
  cluster: "eu",
});

export default pusher;
