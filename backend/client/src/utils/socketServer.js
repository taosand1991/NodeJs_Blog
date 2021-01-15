class ServerSocket {
  static connect(socket) {
    socket.on("connect", () => {
      console.log("connected succesfully");

      socket.emit("chat", {
        chat: "mind your speech",
        text: "dont know how to use it yet",
      });
      socket.on("greetings", (data) => {
        console.log(data);
      });
    });
  }
}

export default ServerSocket;
