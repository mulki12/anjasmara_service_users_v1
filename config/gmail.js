"use strict";

const mailer    = require('nodemailer');

const {
    EMAIL_CLIENT,
    EMAIL_ACCOUNT,
    EMAIL_PASSWORD,
    EMAIL_PORT,
    EMAIL_TLS
} = process.env

const data = EMAIL_CLIENT == 'gmail' ? {
    service : EMAIL_CLIENT,
    auth : {
        user : EMAIL_ACCOUNT,
        pass : EMAIL_PASSWORD
    }
}: {
    host: EMAIL_CLIENT,
    port: EMAIL_PORT,
    secure: Boolean(EMAIL_TLS), // use TLS
    auth: {
        user: EMAIL_ACCOUNT,
        pass: EMAIL_PASSWORD,
    },
};

const transporter = mailer.createTransport(data)

const transporter_verify = transporter.verify(function(err, success) {
    if (err) {
        console.log(err);
    } else {
        console.log("Mail Server is ready to take our messages ^_^ and will sent from " + EMAIL_ACCOUNT);
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