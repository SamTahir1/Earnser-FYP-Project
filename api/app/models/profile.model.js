let mongoose = require("mongoose");
let { validator } = require("express-validator");


let userProfile = mongoose.model(
  "userProfile",
  new mongoose.Schema({
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    phone: {
      type: Number
    },
    points: {
      type: Number
    },
    rupees: {
      type: Number
    },
    gender: {
      type: Boolean 
    },
    skills: {
      type: Object 
    },
    profile:  {
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

module.exports = userProfile;
