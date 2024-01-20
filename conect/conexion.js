require('dotenv').config();
const nodemailer = require('nodemailer');



 //transport con  with gmail
const transporter = nodemailer.createTransport({

    service: 'gmail',
    host:'smtp.gmail.com',  
    port : 465,
    secure: true, 
    auth: {
      user: process.env.user,
      pass: process.env.pass,
    },
  });



transporter.verify( function(error, success) {
 if(error){
    console.log("error "+error)
 }else{

    console.log("conexion establecida")
 }


} )




module.exports = transporter;