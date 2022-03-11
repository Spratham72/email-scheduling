const nodemailer=require('nodemailer');
require('dotenv').config();

const transporter= nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false, 
    auth: {
      user: process.env.user,
      pass: process.env.pass,
    },
  });

  module.exports=transporter;