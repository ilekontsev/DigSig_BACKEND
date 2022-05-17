const nodemailer = require('nodemailer');


module.exports.sendMailCode = () => {
    console.log(32131)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'sendcode123@gmail.com',
          pass: 'ljrpjvkisoxjtvav'
        }
      });
      
      const mailOptions = {
        from: 'sendcode123@gmail.com',
        to: 'sijedap204@akapple.com',
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
}

