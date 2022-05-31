const AccountModel = require('../models/Account.model');
const bcrypt = require('bcrypt');
const UserCheck = require('../helpers/exists_user.helper');
const EmailValidator = require('../helpers/emailValidator.helper')
require('dotenv').config();

module.exports = {
    addMembre: async (req, res , next) => {
        try {            
            const {pseudo,email,password}= await  req.body;
            // UserCheck(email);
            const dataInstance = new AccountModel({pseudo,email,password,role:"Membre"});
            const hashedPassword = await bcrypt.hash(password,10)
            dataInstance.password = hashedPassword;
            await dataInstance.save()
            EmailValidator.validateEmail({pseudo,email,password:hashedPassword})
            // res.status(201).json(instance);
            return res.redirect('/login')
        } catch (err) {
            // res.status(400).json(error);
            res.redirect('/register');
            console.log("asdsdzsd");
        }
    },
    addDrivingSchool: async (req, res , next) => {
        try {
            const {schoolname,email,password}= req.body;
            if(await UserCheck(email)){
               res.send("user already exists") 
            }
            const dataInstance = new AccountModel({pseudo:schoolname,email,password,role:"DrivingSchool"});
            const hashedPassword = await bcrypt.hash(password,10)
            dataInstance.password = hashedPassword;
            await dataInstance.save()
            EmailValidator.validateEmail({pseudo:schoolname,email,password:hashedPassword})
            // res.status(201).json(instance);
            return res.redirect('/login')
        } catch (err) {
            // res.status(400).json(error);
            res.redirect('/register/drivingschool');
            console.log("asdsdzsd");
        }
    }
}
