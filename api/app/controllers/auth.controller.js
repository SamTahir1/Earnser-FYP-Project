let config = require("../config/auth.config");
let db = require("../models");
let User = db.user;
let { validationResult } = require("express-validator");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  let errors = validationResult(req);
  let err_len = JSON.parse(errors.array().length); 

  if (err_len>1){
    return res.status(400).json({
      errors: errors.array(),
    });
  } else {

    let user = new User({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      role: req.body.role,
    });

    user.save(function (err, user) {
      // If any error found return msg with error
      if (err) {
        console.log(err)
        res.status(500).send({ message: err });
        return;
      }
        res.send({ message: "Registeration successful" });
    });
  }
};

exports.signin = (req, res) => {
 let errors = validationResult(req);

 let err_len = JSON.parse(errors.array().length); 
 
 if (err_len>1){
    return res.status(400).json({
      errors: errors.array(),
    });
 } else {
  User.findOne({
    username: req.body.username,
  })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        accessToken: token,
      });
    });
  }
};
