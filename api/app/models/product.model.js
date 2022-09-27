let mongoose = require("mongoose");
let { validator } = require("express-validator");


let product = mongoose.model(
  "product",
  new mongoose.Schema({
    title: {
      type: String
    },
    description: {
      type: String
    },
    features: {
      type: Object
    },
    installation: {
      type: String
    },
    rupees: {
      type: Number 
    },
    Product: {
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

module.exports = product;
