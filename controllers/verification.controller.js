const AccountModel = require('../models/Account.model');

//const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
module.exports = {
    verifyUser: async (req, res) => {
        try {
            const token = req.body.token;
            if(token){
                jwt.verify(token,process.env.JWT_ACC_VERIFICATION,(err,decodedToken)=>{
                    if(err){
                        return res.json({'meassge':err.meassge});
                    }
                    const {name,email,password} = decodedToken;
                    AccountModel.findOneAndUpdate({email},{verified:true},(err,data)=>{
                        if(err){
                            res.json({'err':err.meassge})
                        }else{
                            console.log(data);
                            res.redirect('/login');
                        }
                    })
                })
            }else{ 
                res.json({error:'somthing went wrong !'})
            }
        } catch (error) {
            res.status(400).json(error);
            console.log("de SVz");
        }
    }
}
            // const {email , password} = req.body;
            // const user = await AccountModel.findOne({email});
            // if(!user){
            //     console.log("user not found");
            //     return res.redirect('/register');
            // }
            // if(await bcrypt.compare(password,user.password)){
            //     if(user.verified){
            //         console.log("user connected");
            //         req.session.isAuth = true;
            //         return res.redirect('/connected');
            //     }else{
            //         console.log('check your verification email');
            //         return res.redirect('/login');
            //     }
            // }
            // return res.redirect('/login');
