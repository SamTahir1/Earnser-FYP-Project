let SolutionsController = require("../controllers/solution.controller");
let { validator } = require("express-validator");
let { body, checkSchema, validationResult } = require("express-validator");



module.exports = function (app) {

// // Get all queries by user id
  app.get(
    "/api/solutions/:uid",
    SolutionsController.viewAllByUser
  );

// // Get by query id like 624dcab0a05cddb14ddce8aa 
// app.get(
//   "/api/query/:id/view",
//   SolutionsController.viewByQueryId
// );

  app.post(
    "/api/solutions/create",
    SolutionsController.create
  );

};
