let mongoose = require("mongoose");
let { validator } = require("express-validator");


let Solutions = mongoose.model(
  "soultion",
  new mongoose.Schema({
    soluDes: {
      type: String
    },
    comment_des: {
      type: String
    },
    user_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  })
);

module.exports = Solutions;
