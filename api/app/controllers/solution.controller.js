let config = require("../config/auth.config");
let db = require("../models");
let { validator } = require("express-validator");
let { validationResult } = require("express-validator");
let uuid = require('uuid');

let Comment = db.comment;
let Solution = db.solution; 

// Create and Save a new Solution
exports.create = (req, res) => {
  let errors = validationResult(req);

  if (JSON.parse(errors.array().length)) {
    return res.status(400).json({
      errors: errors.array(),
    });
  } else {
   
    let uid = req.body.user_id;
    let cid = req.body.comment_id;
    Comment.findOne({ _id: cid }, function (err, commentData) {
      if (err) {
        res.status(500).send({ message: err });
        return;
      } else {
        let solution = new Solution({
          soluDes: req.body.description,
          comment_des: commentData.description,
          user_id: uid,
        });

        solution.save(function (err, soultionData) {
          // If any error found return msg with error
          if (err) {
            return res.status(500).send({ message: err });
    
          } else {

            res.status(200).send({
              success: true,
              message: 'Successfully added in best Solutions'
            })  
          }
        });

      }
    });
  }
};


// View All Queries by User_ID
exports.viewAllByUser = (req, res) => {
  let errors = validationResult(req);

  if (JSON.parse(errors.array().length)) {
    return res.status(400).json({
      errors: errors.array(),
    });
  } else {
    let uid = req.params.uid;

    Solution.find({ user_id: uid }, function (err, solutionData) {
      // If any error found return msg with error
      if (err) {
        res.status(500).send({ message: err });
        return;
      } else {
        console.log(solutionData)
          res.send(solutionData);       

      }
    });
  }
};







 
