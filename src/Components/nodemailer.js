var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'daud.mushtaq@cognitiveaxis.com',
    pass: 'QMobile$W20'
  }
});

var mailOptions = {
  from: 'daud.mushtaq@cognitiveaxis.com',
  to: 'daudmushtaq199@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});