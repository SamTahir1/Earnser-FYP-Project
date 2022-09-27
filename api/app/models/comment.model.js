let mongoose = require("mongoose");
let { validator } = require("express-validator");


let Comment = mongoose.model(
  "comment",
  new mongoose.Schema({
    description: {
      type: String
    },
    status: {
      type: String
    },
    files: {
      type: Object 
    },
    user_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    query_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Query",
      },
    ]
    
  })
);

module.exports = Comment;
