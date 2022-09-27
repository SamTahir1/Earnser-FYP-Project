let config = require("../config/auth.config");
let db = require("../models");
let { validator } = require("express-validator");
let { validationResult } = require("express-validator");
let uuid = require('uuid');
var fileupload = require('express-fileupload');
require('dotenv').config();

let UserProfile = db.profile;
let Product = db.product;
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
    let uploadPath = __dirname + '/../../../public/upload/products/';
    var  file = "";
    file = req.files.product;

      var userfullname = {};
    UserProfile.findOne({ user_id: uid }, function (err, userData) {
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
            filename = uuid.v1() + "-" + file.name;
            fullUploadPath = uploadPath + filename;

            var datetime = new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"});
            let Product = db.product;

            var path = require('path')
            var fileExe = path.extname(filename)
            if(fileExe !== ".zip"){
              console.log("FILE ERROR")
              return res.status(500).send({ message: "File name must be ZIP" });
            }

            // Create User Product
            let product = new Product({
              title: req.body.title,
              description: req.body.description,
              features: req.body.features,
              installation: req.body.installation,
              rupees: req.body.rupees,
              fullName: userfullname,
              product: filename,
              status: "Pending",
              user_id: uid,
              date: datetime
            });


            // Save Profile with image
            product.save(function (err, user) {
              // If any error found return msg with error
              if (err) {
                res.status(500).send({ message: err });
                return;
              } else {
                  file.mv(fullUploadPath, function (err, result) {
                    if (err) {
                      throw err;
                    } else {
                      res.status(200).send({
                        success: true,
                        message: 'Successfully create product'
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

// View Product by query id
exports.viewByProductId = (req, res) => {
  let errors = validationResult(req);

  if (JSON.parse(errors.array().length)) {
    return res.status(400).json({
      errors: errors.array(),
    });
  } else {
    let pid = req.params.pid;
    console.log(req.params)
    Product.findById({ _id: pid }, function (err, productData) {
      // If any error found return msg with error
      if (err) {
        res.status(500).send({ message: err });
        return;
      } else {
        let uid = productData.user_id;

        UserProfile.findOne({ user_id: uid }, function (err, userData) {
          if (err) {
            res.status(500).send({ message: err });
            return;
          } else {
            let First_Name = userData.firstName;
            let Last_Name = userData.lastName;
            var product_data = {
              productData,
              'FullName': First_Name + " " + Last_Name,
            };
            console.log(product_data)
            res.send({
              product_data
            })
          }
        });
      }
    });
  }
};


// View All Products 
exports.viewAll = (req, res) => {
  let errors = validationResult(req);

  if (JSON.parse(errors.array().length)) {
    return res.status(400).json({
      errors: errors.array(),
    });
  } else {

    Product.find({}, function (err, products) {
      res.send(products);
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
    let pid = req.params.pid;
    let proData = {
      status: "Approved"
    }
    Product.findOneAndUpdate({ _id: pid }, proData, function (err, productData) {
      // If any error found return msg with error
      if (err) {
        res.status(500).send({ message: err });
        return;
      } else {
        
        res.send({
          success: true,
          message: 'Successfully Approve the Product'   
        })

      }
    });
  }
};