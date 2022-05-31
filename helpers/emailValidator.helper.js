var jwt = require('jsonwebtoken');
const mailgun = require("mailgun-js");

const DOMAIN = 'sandbox31615e0eecf64258811d87ea906afd5c.mailgun.org';
const mg = mailgun({apiKey: process.env.MAILGUN_APIKEY, domain: DOMAIN});


module.exports = {
    validateEmail: ({pseudo,email,Password}) => {
        const token = jwt.sign({pseudo,email,Password},process.env.JWT_ACC_VERIFICATION,{expiresIn:'1440m'});
        const data = {
            from: 'noreply@email.com',
            to: email,
            subject: 'verification email',
            html: `
            <h2><a href='http://localhost:3004/verification?token=${token}'>click here to verify your email</a></h2>
            `
            // <form action="http://localhost:3004/verification" method="post">
            //     <input type="text" name="token" placeholder="${token}" style="display: none;">
            //     <button type="submit"><h3>click here to verify your email</h3></button>
            // </form>
        };
        mg.messages().send(data,(error, body)=>{
            if(error){
                return res.json({error:error.message});
            }
            console.log(body);
        });
    },
  };
  