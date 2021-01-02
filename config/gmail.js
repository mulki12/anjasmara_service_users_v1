"use strict";

const env       = require('dotenv').config()
const mailer    = require('nodemailer');

const {
    EMAIL_CLIENT,
    EMAIL_ACCOUNT,
    EMAIL_PASSWORD
} = process.env

const transporter = mailer.createTransport({
    service : EMAIL_CLIENT,
    auth : {
        user : EMAIL_ACCOUNT,
        pass : EMAIL_PASSWORD
    }
})

const transporter_verify = transporter.verify(function(err, success) {
    if (err) {
        console.log(err);
    } else {
        console.log("Mail Server is ready to take our messages ^_^");
    }
})

let sendMail = (mailOptions)=>{
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
    });
  };

module.exports = transporter_verify;
module.exports = sendMail;