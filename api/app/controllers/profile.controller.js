let config = require("../config/auth.config");
let db = require("../models");
let { validator } = require("express-validator");
let { validationResult } = require("express-validator");
var fileupload = require('express-fileupload');
require('dotenv').config();


let UserProfile = db.profile;
let User = db.user;

// Create User Profile 
exports.view = (req, res) => {
  let errors = validationResult(req);

  if (JSON.parse(errors.array().length)){
    return res.status(400).json({
      errors: errors.array(),
    });
  } else {
      let uid = req.params.id;
      let file = "";
      let uploadPath = __dirname + '/../../../public/upload/profile/';

      User.findById(uid, function(err, userData) {
        if (err) {
              res.status(500).send({ message: err });
              return;
            }else{
              let username = userData.username;
              let email = userData.email;
              var user_data = {
                'username': username,
                'email': email
              };

              UserProfile.findOne({ user_id: uid}, req.body ,function (err, userProfileData) {
                // If any error found return msg with error
                if (err) {
                  res.status(500).send({ message: err });
                  return;
                }else{
                    var data_user_profile = [];
                    data_user_profile = [userProfileData , userData];
                    
                    res.send({
                      data_user_profile
                    })
                }
              }); 
            }
      });
  }
};

// Create User Profile 
exports.create = (req, res) => {
  let errors = validationResult(req);

  if (JSON.parse(errors.array().length)){
    return res.status(400).json({
      errors: errors.array(),
    });
  } else {
      let uid = req.params.id;
      let file = "";
      let uploadPath = process.env.profile_path;
      
      if(req.files){
        file = req.files.profile;
      }

      // UserProfile.find({ user_id: uid} ,function (err, userProfileData) {
        UserProfile.countDocuments({user_id: uid}, function (err, count){ 

        // If any error found return msg with error
        if (err) {
          res.status(500).send({ message: err });
          return;
        }else{
          if(count>0){
            return res.status(406).send({ message: "Profile already create for this user!" });
          }
        }
      }); 

      if(req.body.firstName && req.body.lastName && req.body.gender){

      // Get User Data
      User.findById(uid, function(err, user) {
        if (err) {
              return res.status(500).send({ message: err });
            }else{
              let username = user.username;
              let filename = "";
              let fullUploadPath = "";

              if(file){
                filename = username + "_" + file.name;
                fullUploadPath = uploadPath + filename;
              }
              
            // Create User Profile
              let profile = new UserProfile({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                gender: req.body.gender,
                phone: req.body.phone,
                points: 10,
                rupees: 100,
                skills: req.body.skills,
                user_id: uid
              });

              if(file){
                profile.profile =  filename;
              }

              // Save Profile with image
              profile.save(function (err, user) {
                // If any error found return msg with error
                if (err) {
                  res.status(500).send({ message: err });
                  return;
                }else{

                  if(file){
                    file.mv(fullUploadPath, function(err, result){
                      if(err){
                        throw err;
                      }else{
                        // res.setHeader("Content-Type", "text/html");
                        res.status(200).send({
                          success: true,
                          message: 'Successfully create user profile.'   
                        })
                      }
                    });
                  }else {
                      res.send({
                        success: true,
                        message: 'Successfully create user profile.'   
                      })
                    }
                }
              }); 
            }
      });

    }else{
      return res.status(406).send({ message: "Need all data!" });
    }
  }
};

// Update User Profile 
exports.update = (req, res) => {
  let errors = validationResult(req);

  if (JSON.parse(errors.array().length)){
    return res.status(400).json({
      errors: errors.array(),
    });
  } else {
      let uid = req.params.id;
      let file = "";
      let uploadPath = process.env.profile_path;
      
      if(req.files){
        file = req.files.profile;
      }


      // Get User Data
      User.findById(uid, function(err, user) {
        if (err) {
              res.status(500).send({ message: err });
              return;
            }else{
              let username = user.username;
              let filename = "";
              let fullUploadPath = "";

              if(file){
                filename = username + "_" + file.name;
                fullUploadPath = uploadPath + filename;
                req.body.profile =  filename;
              }
              
              // Save Profile with image
              UserProfile.findOneAndUpdate({ user_id: uid}, req.body ,function (err, user) {
                // If any error found return msg with error
                if (err) {
                  res.status(500).send({ message: err });
                  return;
                }else{

                  if(file){
                    file.mv(fullUploadPath, function(err, result){
                      if(err){
                        throw err;
                      }else{
                        res.send({
                          success: true,
                          message: 'Successfully update user profile.'   
                        })
                      }
                    });
                  }else {
                      res.send({
                        success: true,
                        message: 'Successfully update user profile.'   
                      })
                    }
                }
              }); 
            }
      });
  }
};

exports.userData = (req, res) => {
  let errors = validationResult(req);

  if (JSON.parse(errors.array().length)){
    return res.status(400).json({
      errors: errors.array(),
    });
  } else {
      let uid = req.params.id;

      // Get User Data
      User.findById(uid, function(err, user) {
        if (err) {
              res.status(500).send({ message: err });
              return;
            }else{
              res.send({
                user
              })
            }
      });
  }
};



