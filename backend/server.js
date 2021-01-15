require("dotenv").config();
const express = require("express");
const passport = require('passport');
const mongoose = require("mongoose");
const session = require('express-session')
const http = require("http");
const cors = require("cors");
const path = require("path");
const socketIo = require("socket.io");
const expressStatusMonitor = require("express-status-monitor");

const app = express();
const port = process.env.PORT || 5000;

const server = http.createServer(app);

const io = socketIo(server, { transports: ["polling"] });

io.on("connect", (socket) => {
  console.log("conected");

  socket.emit("greetings", { message: "welcome to the world of data" });
  socket.on("chat", (data) => {
    console.log(data);
  });
});
server.listen(port, () => console.log(`listening to port ${port}`));

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("connected to database"))
  .catch((err) => console.log(err));
const corsOptions = {
  origin: "*",
  credentials: true,
  optionsSuccessStatus: 200, 
};
app.use(
  expressStatusMonitor({
    websocket: socketIo,
    port: app.get("port"),
  })
);

app.use(cors(corsOptions));
app.use(session({
  resave:false,
  saveUninitialized:false,
  secret:'keyboard cat'
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static(path.join(__dirname, "client/build")));
app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/users", require("./routes/user"));
app.use("/auth/login/", require("./routes/login"));
app.use("/posts", require("./routes/posts"));
app.use("/category", require("./routes/category"));
app.use("/reset", require("./routes/auth"));
app.use('/social', require('./AuthRoutes/passport'))

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});
