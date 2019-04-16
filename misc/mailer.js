var nodemailler = require('nodemailer');
var config = require('../config/mailer');
var xouath2 = require('xoauth2');



var transporter = nodemailler.createTransport({
           service: 'gmail',
           auth: {
               type: 'OAuth2',
               user: 'klyovan88@gmail.com' ,
               clientId: config.client_id,
               clientSecret: config.client_secret,
               refreshToken: config.resfreshToken,
               accessToken: config.accessToken,
           }});

module.exports = transporter;








