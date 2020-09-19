const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: { required: true, type: String },
    username: { required: true, type: String },
    password: { required: true, type: String },
    refreshToken: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
