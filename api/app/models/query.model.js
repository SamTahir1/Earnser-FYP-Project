let mongoose = require("mongoose");
let { validator } = require("express-validator");


let Query = mongoose.model(
  "query",
  new mongoose.Schema({
    title: {
      type: String
    },
    description: {
      type: String
    },
    skills: {
      type: Object
    },
    points: {
      type: Number
    },
    expiretime: {
      type: Number
    },
    rupees: {
      type: Number 
    },
    files: {
      type: Object 
    },
    date: {
      type: String 
    },
    status: {
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

module.exports = Query;
