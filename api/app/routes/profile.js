let profileController = require("../controllers/profile.controller");
let { validator } = require("express-validator");
let { body, checkSchema, validationResult } = require("express-validator");



module.exports = function (app) {

  let UserProfileCreateScheema = {
    firstName: {
      notEmpty: {
        errorMessage: 'First name is Required.'
      },
      isAlpha: {
        errorMessage: 'First name should be char(Aa-Zz).'
      },
      isLength: {
        options: { min: 3, max : 25 }
      },
      errorMessage: "First Name should be at least 3 to 25 char long.",
    },
    lastName: {
      notEmpty: {
        errorMessage: 'Last name is Required.'
      },
      isAlpha: {
        errorMessage: 'First name should be char(Aa-Zz).'
      },
      isLength: {
        options: { min: 3, max: 25 }
      },
      errorMessage: "Last Name should be at least 3 to 25 char long.",
    },
    gender: {
      notEmpty: {
        errorMessage: 'Gender is Required.'
      }
    },
    phone: {
      notEmpty: {
        errorMessage: 'Phone number is Required.'
      },
      isInt: {
        errorMessage: 'Phone number should be numbers(0-9).'
      },
      isLength: {
        options: { min: 11, max: 11 },
        errorMessage: 'Phone number should be 11 numbers.'
      },
      trim: true,
    },
    skills: {
      notEmpty: {
        errorMessage: 'Skils are Required.'
      },
      // isLength: {
      //   options: { min: 3, max: 10 }
      // },
      errorMessage: "Skills should be at least 3 to 10.",
    }
  };

  let UserProfileUpdateScheema = {
    firstName: {
      isAlpha: {
        errorMessage: 'First name should be char(Aa-Zz).'
      },
      isLength: {
        options: { min: 3, max : 25 }
      },
      errorMessage: "First Name should be at least 3 to 25 char long.",
    },
    lastName: {
      isAlpha: {
        errorMessage: 'First name should be char(Aa-Zz).'
      },
      isLength: {
        options: { min: 3, max: 25 }
      },
      errorMessage: "Last Name should be at least 3 to 25 char long.",
    },
    phone: {
      isInt: {
        errorMessage: 'Phone number should be numbers(0-9).'
      },
      isLength: {
        options: { min: 11, max: 11 },
        errorMessage: 'Phone number should be 11 numbers.'
      },
      trim: true,
    },
    skills: {
      // isLength: {
      //   options: { min: 3, max: 10 }
      // },
      errorMessage: "Skills should be at least 3 to 10.",
    }
  };

  app.get(
    "/api/profile/:id/view",
    profileController.view
  );

  app.post(
    "/api/profile/:id/create",
    checkSchema(UserProfileCreateScheema),
    profileController.create
  );

  app.put(
    "/api/profile/:id/update",
    // checkSchema(UserProfileUpdateScheema),
    profileController.update
  );

  app.get(
    "/api/user/:id/",
    profileController.userData
  );
};
