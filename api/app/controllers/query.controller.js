let config = require("../config/auth.config");
let db = require("../models");
let { validator } = require("express-validator");
let { validationResult } = require("express-validator");
let uuid = require('uuid');
var fileupload = require('express-fileupload');
require('dotenv').config();

let UserProfile = db.profile;
let Query = db.query;
let User = db.user;

// Create and Save a new Query
exports.create = (req, res) => {
  let errors = validationResult(req);

  if (JSON.parse(errors.array().length)) {
    return res.status(400).json({
      errors: errors.array(),
    });
  } else {
   
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

            
            // Create User Query
            let query = new Query({
              title: req.body.title,
              description: req.body.description,
              skills: req.body.skills,
              points: req.body.points,
              rupees: req.body.rupees,
              expiretime: req.body.expiretime,
              userName: username,
              fullName: userfullname,
              user_id: uid,
              date: datetime
            });

            if (file) {
              query.files = filename;
            }

            // Save Profile with image
            query.save(function (err, user) {
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
                        message: 'Successfully create query.'
                      })
                    }
                  });
                } else {
                  res.send({
                    success: true,
                    message: 'Successfully create query.'
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

exports.update = (req, res) => {
  let errors = validationResult(req);

  if (JSON.parse(errors.array().length)) {
    return res.status(400).json({
      errors: errors.array(),
    });
  } else {
    let uid = req.body.user_id;
    let file = "";
    let uploadPath = __dirname + '/../../../public/upload/files/';

    if (req.files) {
      file = req.files.files;
    }

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
          filename = username + "_" + file.name;
          fullUploadPath = uploadPath + filename;
        }

        if (file) {
          req.body.files = filename;
        }

        // Save Profile with image
        Query.findByIdAndUpdate({ _id: req.params.id }, req.body, function (err, user) {
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
                    message: 'Successfully update query.'
                  })
                }
              });
            } else {
              res.send({
                success: true,
                message: 'Successfully update query.'
              })
            }
          }
        });
      }
    });
  }
};

exports.delete = (req, res) => {
  let errors = validationResult(req);

  if (JSON.parse(errors.array().length)) {
    return res.status(400).json({
      errors: errors.array(),
    });
  } else {
        // Delete query
        Query.findOneAndDelete({ _id: req.params.id }, function (err, query) {
          // If any error found return msg with error
          if (err) {
            return res.status(500).send({ message: err });
          } else {
            res.status(200).send({
              success: true,
              message: 'Successfully delete query.'
            })
          }
      
    });
  }
};

// View Query by query id
exports.viewByQueryId = (req, res) => {
  let errors = validationResult(req);

  if (JSON.parse(errors.array().length)) {
    return res.status(400).json({
      errors: errors.array(),
    });
  } else {
    let qid = req.params.id;

    Query.findById({ _id: qid }, function (err, queryData) {
      // If any error found return msg with error
      if (err) {
        res.status(500).send({ message: err });
        return;
      } else {
        let uid = queryData.user_id;

        UserProfile.findOne({ user_id: uid }, function (err, userData) {
          if (err) {
            res.status(500).send({ message: err });
            return;
          } else {
            let First_Name = userData.firstName;
            let Last_Name = userData.lastName;
            var query_data = {
              queryData,
              'FullName': First_Name + " " + Last_Name,
            };

            res.send({
              query_data
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

    UserProfile.findOne({ user_id: uid }, req.body, function (err, userData) {
      if (err) {
        res.status(500).send({ message: err });
        return;
      } else {
        let First_Name = userData.firstName;
        let Last_Name = userData.lastName;
        var user_data = {
          'Name': First_Name + " " + Last_Name,
        };

        Query.find({ user_id: uid }, function (err, userProfileData) {
          // If any error found return msg with error
          if (err) {
            res.status(500).send({ message: err });
            return;
          } else {
            var user_query = [];
            user_query = [userProfileData, user_data];

            res.send({
              user_query
            })
          }
        });
      }
    });
  }
};

// View All Queries 
exports.viewAll = (req, res) => {
  let errors = validationResult(req);

  if (JSON.parse(errors.array().length)) {
    return res.status(400).json({
      errors: errors.array(),
    });
  } else {

    let uid = req.params.uid;
    let file = "";
    let uploadPath = __dirname + '/../../../public/upload/files/';

    Query.find({}, function (err, queries) {
      var queryMap = {};


      res.send(queries);
    });

  }
};


exports.expireQuery = (req, res) => {
  let errors = validationResult(req);

  if (JSON.parse(errors.array().length)) {
    return res.status(400).json({
      errors: errors.array(),
    });
  } else {

        Query.find({}, function (err, allQueries) {
          // If any error found return msg with error
          if (err) {
            res.status(500).send({ message: err });
            return;
          } else {
            
              allQueries.map((query, index) => {
                let expireTime = query.expiretime;
                if(query.date){
                  var askedDate = new Date(query.date);
                  let today = new Date()
                  
                  if(expireTime == 24){
                    expireTime = 1;
                    askedDate.setDate(askedDate.getDate() + 1)
                  }else if(expireTime == 72){
                    expireTime == 3;
                    askedDate.setDate(askedDate.getDate() + 3)
                  }else{
                    expireTime == 5;
                    askedDate.setDate(askedDate.getDate() + 5)
                  }
                  
                  var queryUpdate = {
                    rupees: 0
                  };
                  let qid = query.id;

                  if(askedDate < today){
                    Query.findByIdAndUpdate({ _id: qid }, queryUpdate, function (err, user) {
                      // If any error found return msg with error
                      if (err) {
                        return res.status(500).send({ message: err });
                        
                      } else {
                        return
                        //  res.status(200).send({status: 0, message: "Messages available"});
                        }
                    });   
                  }
                
                }
              });
            }
          });        
      }
    };




 
