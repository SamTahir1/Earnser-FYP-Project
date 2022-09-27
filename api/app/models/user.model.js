let mongoose = require("mongoose");
let { validator } = require("express-validator");


let User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    status: {
      type: String,
      default: 'online'
    },
    role: {
        type: String,
        default: 'user'
    },
  })
);

module.exports = User;
