let config = require("../config/auth.config");
let db = require("../models");
let Users = db.user;
let UserProfile = db.profile;
let { validator } = require("express-validator");
let { validationResult } = require("express-validator");

exports.allUsers = (req, res) => {
  let errors = validationResult(req);

  if (JSON.parse(errors.array().length)){
    return res.status(400).json({
      errors: errors.array(),
    });
  } else {
          UserProfile.find({ }, function (err, userProfileData) {
            // If any error found return msg with error
            if (err) {
              res.status(500).send({ message: err });
              return;
            }else{
                
                
                res.send({
                  AllUsers: userProfileData
                })
            }
          }); 
           
  }
};