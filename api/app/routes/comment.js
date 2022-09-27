let CommentController = require("../controllers/comment.controller");
let { validator } = require("express-validator");
let {  checkSchema } = require("express-validator");



module.exports = function (app) {

  let CommetnCreateScheema = {
    description: {
      notEmpty: {
        errorMessage: 'Comment is Required.'
      },
      isLength: {
        options: { min: 15 }
      },
      errorMessage: "Comment should be at least 15 char long.",
    },
    user_id: {
      notEmpty: {
        errorMessage: 'Please login before create query.'
      }
    }
  };


// Get all comment by query id
  app.get(
    "/api/comment/:qid/view",
    CommentController.viewByQueryId
  );

  //Create Comment 
  app.post(
    "/api/comment/:qid/create",
    checkSchema(CommetnCreateScheema),
    CommentController.create
  );

  app.post(
    "/api/comment/:qid/approve",
    CommentController.approve
  );

};
