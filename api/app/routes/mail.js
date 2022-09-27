
let Mailcontroller = require("../controllers/mail.controller");
let {  checkSchema } = require("express-validator");

module.exports = function(app) {
  let mailSheema = {
    senderName: {
      notEmpty: {
        errorMessage: 'Name is Required '
      }
    },
    senderMail: {
      notEmpty: {
        errorMessage: 'Email is Required'
      }
    },
    senderMsg: {
      notEmpty: {
        errorMessage: 'Message is Required'
      }
    }
  };

  app.post(
    "/api/send/mail",
    // checkSchema(mailSheema),
    Mailcontroller.create
  );

};