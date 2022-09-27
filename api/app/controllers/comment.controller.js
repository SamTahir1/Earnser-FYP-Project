let config = require("../config/auth.config");
let db = require("../models");
let { validator } = require("express-validator");
let { validationResult } = require("express-validator");
let uuid = require('uuid');
var fileupload = require('express-fileupload');
require('dotenv').config();

let UserProfile = db.profile;
let Query = db.query;
let Comment = db.comment;
let User = db.user;

// Create and Save a new Query
exports.create = (req, res) => {
  let errors = validationResult(req);

  if (JSON.parse(errors.array().length)) {
    return res.status(400).json({
      errors: errors.array(),
    });
  } else {
    let qid = req.params.qid;
    let uid = req.body.user_id;
    let file = "";
    let uploadPath = __dirname + '/../../../public/upload/files/';
    if (req.files) {
      file = req.files.files;
    }
    var userfullname = {};
    UserProfile.findOne({ user_id: uid }, req.body, function (err, userData) {
      if (err) {
        res.status(500).send({ message: err });
        return;
      } else {
        let First_Name = userData.firstName;
        let Last_Name = userData.lastName;

        userfullname = {
          'Name': First_Name + " " + Last_Name,
        };
        

        // Get User Data
        User.findById(uid, function (err, user) {
          if (err) {
            res.status(500).send({ message: err });
            return;
          } else {
            let username = user.username;
            let filename = "";
            let fullUploadPath = "";

            if (file) {
              filename = uuid.v1() + "-" + file.name;
              fullUploadPath = uploadPath + filename;
            }

            var datetime = new Date();
            
            // Create User Comment
            let comment = new Comment({
              description: req.body.description,
              user_id: uid,
              query_id: qid,
              date: datetime,
              status: "Ideal"
            });

            if (file) {
              comment.files = filename;
            }
            // Save Profile with image
            comment.save(function (err, comment) {
              // If any error found return msg with error
              if (err) {
                res.status(500).send({ message: err });
                return;
              } else {

                if (file) {
                  file.mv(fullUploadPath, function (err, result) {
                    if (err) {
                      throw err;
                    } else {
                      res.status(200).send({
                        success: true,
                        message: 'Successfully add your commment'
                      })
                    }
                  });
                } else {
                  res.send({
                    success: true,
                    message: 'Successfully add your commment'
                  })
                }
              }
            });
          }
        });

      }
    });

  }
};

// View Comment by query id
exports.viewByQueryId = (req, res) => {
  let errors = validationResult(req);

  if (JSON.parse(errors.array().length)) {
    return res.status(400).json({
      errors: errors.array(),
    });
  } else {
    let qid = req.params.qid;

    Comment.find({ query_id: qid }, function (err, commentData) {
      // If any error found return msg with error
      if (err) {
        res.status(500).send({ message: err });
        return;
      } else {
        let commentlenght = Object.keys(commentData).length; 
        if(commentlenght !== 0){
          
        let uid = commentData[0].user_id;
        
          UserProfile.findOne({ user_id: uid }, req.body, function (err, userData) {
            if (err) {
              res.status(500).send({ message: err });
              return;
            } else {
              let First_Name = userData.firstName;
              let Last_Name = userData.lastName;
              
              var comment_data = {
                commentData,
                'FullName': First_Name + " " + Last_Name,
              };

              res.send({
                comment_data
              })
            }
          });
        }
      }
    });
  }
};



exports.approve = (req, res) => {
  let errors = validationResult(req);

  if (JSON.parse(errors.array().length)) {
    return res.status(400).json({
      errors: errors.array(),
    });
  } else {
    let qid = req.params.qid;
    let uid = req.body.user_id;
    let cid = req.body.cid;

    Query.findOne({ _id: qid }, function (err, queryData) {
      // If any error found return msg with error
      if (err) {
        res.status(500).send({ message: err });
        return;
      } else {
        let commentData = {
          status: "Approved"
        }
        Comment.findOneAndUpdate({ _id: cid },commentData, function (err, comment) {
          // If any error found return msg with error
          if (err) {
            return res.status(500).send({ message: err });
          } else {
            let queryPoints = queryData?.points;
            let queryrupees = queryData?.rupees;

            UserProfile.findOne({ user_id: uid }, function (err, userData) {
              if (err) {
                res.status(500).send({ message: err });
                return;
              } else {
                
                let userPoints = userData?.points;
                let userRupees = userData?.rupees;
                if(userPoints == ""){
                  userPoints = 0;
                }
                if(userRupees == ""){
                  userRupees = 0;
                }
                if(queryPoints == ""){
                  queryPoints = 0;
                }
                if(queryrupees == ""){
                  queryrupees = 0;
                }
                let points = userPoints + queryPoints;
                let rupees = userPoints + queryrupees;

                let data = {
                  points: points,
                  rupees: rupees
                }

                UserProfile.findOneAndUpdate({ user_id: uid}, data ,function (err, user) {
                  // If any error found return msg with error
                  if (err) {
                    res.status(500).send({ message: err });
                    return;
                  }else{

                    res.send({
                      success: true,
                      message: 'Successfully send points and rupees to user.'   
                    })
                  
                  }
                });         
              }
            });
          }
        });
      }
    });
  }
};
