let mongoose = require("mongoose");
let { validator } = require("express-validator");


let Message = mongoose.model(
  "Message",
  new mongoose.Schema({
    content: {
      type: String,
    },
    form: {
      type: Object,
    },
    Socketid: {
      type: String,
    },
    time: {
      type: String,
    },
    date: {
      type: String,
    },
    to: {
      type: String,
    }
  })
);

module.exports = Message;
