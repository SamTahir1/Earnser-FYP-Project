let { verifySignUp } = require("../middlewares");
let authController = require("../controllers/auth.controller");
let { validator } = require("express-validator");
let { body, checkSchema, validationResult } = require("express-validator");
let db = require("../models");
let ROLES = db.ROLES;
let User = db.user;

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  let registrationSchema = {
    username: {
      notEmpty: {
        errorMessage: 'Username is Required'
      },
      isLength: {
        options: { min: 3, max : 20 }
      },
      errorMessage: "Username should be at least 3 chars long",
      custom: {
        options: (value) => {
          return User.find({
            username: value,
          }).then((user) => {
            if (user.length > 0) {
              return Promise.reject("Username already in use");
            }
          });
        },
      },
    },
    email: {
      notEmpty: {
        errorMessage: 'Email is Required.'
      },
      normalizeEmail: true,
      errorMessage: 'Please enter a valid email address',
      custom: {
        options: (value) => {
          return User.find({
            email: value,
          }).then((user) => {
            if (user.length > 0) {
              return Promise.reject("Email already in used");
            }
          });
        },
      },
    },
    password: {
      notEmpty: {
        errorMessage: 'Password is Required'
      },
      isStrongPassword: {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
      },
      errorMessage: 'Password should be at least 8 chars long with atleast 1 lowercase,uppercase and numberic value',
    },
  };

  app.post(
    "/api/auth/signup",
    checkSchema(registrationSchema),
    authController.signup
  );


  let SignInSchema = {
    username: {
      notEmpty: {
        errorMessage: 'Username is Required.'
      },
    },
    password: {
      notEmpty: {
        errorMessage: 'Password is Required.'
      },
    }
  };

  app.post(
    "/api/auth/signin",
    checkSchema(SignInSchema),
    authController.signin
  );
};
