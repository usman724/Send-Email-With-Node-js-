const express = require('express')
var nodemailer = require('nodemailer') 
var bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



// -> Send  Email using nodemailer 
// -> Body-parser for post data 
app.post('/send-verification-email',  (req, res) => {
    console.log('send-verification-email');
    var transporter = nodemailer.createTransport({
      service: 'gmail',
    //   ADD EMAIL AND PASSWORD (GOOGLE ACCOUNT - > SECURITY -> APP PASSWORD - > select app + select device => generate)
      auth: {
        user: 'Email',
        pass: 'Password'
      }
    });
    
    var mailOptions = {
      from: req.body.from ,
      to: req.body.email,
      subject: req.body.subject,
      text: req.bod.message
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        res.status(401).send(error);
      } else {
        res.status(200).send(
            {
                Result:"Email Send Successfully",
                Subject : req.body.subject,
                Message : req.bod.message,
                From : req.body.from ,
                To :  req.body.to
            }
        );;
      }
    });
    });
   
    const port = process.env.PORT || 8000;
    app.listen(port,()=>{
        console.log(`Server is listing at post ${port}`);
    })
    