const nodemailer=require('nodemailer');
require('dotenv').config();

const transporter= nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false, 
    auth: {
      user: "spratham72@gmail.com",
      pass: "ghiipzzczegqbsuh",
    },
  });

  module.exports=transporter;