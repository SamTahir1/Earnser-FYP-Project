let QueryController = require("../controllers/query.controller");
let {  checkSchema } = require("express-validator");



module.exports = function (app) {

  let QueryCreateScheema = {
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
    points: {
      notEmpty: {
        errorMessage: 'points is Required.'
      },
      isInt: { 
        options: { min: 10, max: 100 }
       },
      errorMessage: "points should be between 10 to 100.",
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
    skills: {
      notEmpty: {
        errorMessage: 'Skils are Required.'
      },
      // isArray: {
      //   options: { min: 3, max: 10},
      // },
      errorMessage: "Skills should be at least 3 to 10.",
    },
    user_id: {
      notEmpty: {
        errorMessage: 'Please login before create query.'
      }
    }
  };


// Get all queries by user id
  app.get(
    "/api/query/:uid/view/all",
    QueryController.viewAllByUser
  );

// Get all queries 
app.get(
  "/api/query/view/all",
  QueryController.viewAll
);

// Get by query id like 624dcab0a05cddb14ddce8aa 
app.get(
  "/api/query/:id/view",
  QueryController.viewByQueryId
);

  //Create Query by login 
  app.post(
    "/api/query/create",
    checkSchema(QueryCreateScheema),
    QueryController.create
  );

  // Update Query by query id
  app.put(
    "/api/query/:id/update",
    // checkSchema(QueryUpdateScheema),
    QueryController.update
  );

  app.put(
    "/api/query/expire",
    QueryController.expireQuery
  );

  app.delete(
    "/api/query/:id/delete",
    // checkSchema(QueryUpdateScheema),
    QueryController.delete
  );
};
