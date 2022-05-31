
const AccountModel = require('../models/Account.model');

module.exports = (email)=>{

    AccountModel.findOne({email: email}).exec((error,user)=>{
        if(error){
            return res.status(400).json({'err':error})
        }
        if(user){
            console.log('user with this email already exist')
            return true;
        }
    })
}