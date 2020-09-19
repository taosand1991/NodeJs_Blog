require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening to port ${PORT}`));

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("connected to database"))
  .catch((err) => console.log(err));
app.use("/uploads", express.static("uploads"));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/users", require("./routes/user"));
app.use("/auth/login/", require("./routes/login"));
app.use("/posts", require("./routes/posts"));
app.use("/category", require("./routes/category"));
app.use("/reset", require("./routes/auth"));

const msg = {
  to: "fs992161@gmail.com",
  from: "tadesina26@gmail.com",
  subject: "Sending first email",
  text: "This is a good one believe me",
  html: "",
};

// sendMessage = async () => {
//   try {
//     await gridMsg.send(msg);
//   } catch (e) {
//     console.log(e.response.body);
//   }
// };

// sendMessage();
