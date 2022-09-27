require('dotenv').config();
let { validationResult } = require("express-validator");
var nodemailer = require('nodemailer');

exports.create = (req, res) => {
  let errors = validationResult(req);

  if (JSON.parse(errors.array().length)){
    return res.status(400).json({
      errors: errors.array(),
    });
  } else {
      var senderMail = req.body.senderMail;
      var senderMsg = req.body.senderMsg;
      var senderName = req.body.senderName;
      var ContactUserMsg = senderMsg + " " + "Message by: " + senderName + " " + "Email form: " + senderMail;

      
      var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
                user: process.env.Node_Mail_User,
                pass: process.env.Node_Mail_Pass
          }
      });

      var mailOptions = {
        from: senderMail,
        to: process.env.Node_Mail_User,
        subject: 'Earnser User ' + senderName + " Contact Us",
        text: ContactUserMsg
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          res.status(500).send({ message: error });
        } else {
          res.send({
            success: true,
            message: 'Thanks! We will contact you soon via email'
          })
        }
      });
           
  }
};