let ProductController = require("../controllers/product.controller");
let { validator } = require("express-validator");
let { body, checkSchema, validationResult } = require("express-validator");



module.exports = function (app) {

  let ProductCreateScheema = {
    title: {
        notEmpty: {
          errorMessage: 'Title is Required.'
        },
        isLength: {
          options: { min: 10 }
        },
        errorMessage: "Title should be at least 10 char long.",
      },
    description: {
      notEmpty: {
        errorMessage: 'Description is Required.'
      },
      isLength: {
        options: { min: 15 }
      },
      errorMessage: "Description should be at least 15 char long.",
    },
    features: {
      notEmpty: {
        errorMessage: 'Features is Required.'
      },
      isLength: {
        options: { min: 15 }
      },
      errorMessage: "Features should be at least 10 char long.",
    },
    installation: {
      notEmpty: {
        errorMessage: 'Installation is Required.'
      },
      isLength: {
        options: { min: 15 }
      },
      errorMessage: "Installation should be at least 10 char long.",
    },
    rupees: {
      notEmpty: {
        errorMessage: 'rupees is Required.'
      },
      isInt: { 
        options: { min: 100, max: 1000 }
        },
      errorMessage: "rupees should be between 100 to 1000.",
    },
    user_id: {
        notEmpty: {
            errorMessage: 'Please login before create query.'
        }
    }
  };

// Get all queries 
  app.get(
    "/api/product/view/all",
    ProductController.viewAll
  );

// Get all comment by query id
  app.get(
    "/api/product/:pid/view",
    ProductController.viewByProductId
  );

  //Create Product 
  app.post(
    "/api/product/create",
    checkSchema(ProductCreateScheema),
    ProductController.create
  );

  app.post(
    "/api/product/:pid/approve",
    ProductController.approve
  );

};
