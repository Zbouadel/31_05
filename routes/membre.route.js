const express = require('express');
const router = express.Router();
const AccountModel = require('../models/Account.model');
const MembreModel = require('../models/membre.model')
const MembreController = require('../controllers/membre.controller')
const { validateBody, schemas } = require('../helpers/validation.helper');

router.route('/')
    .get(async(req,res)=>{
        const mail = req.session.email;
        const membre=await MembreModel.findOne({email:mail});
        if(membre){
            return res.redirect('/connected');
        }
        const user = await AccountModel.findOne({email:mail});
        if(!user) return res.status(400).json({message:"error try again later"})
        const {pseudo,email} = user
        // console.log(req.session,user)
        res.render('membreComplete.ejs',{pseudo,email});
    }).post(validateBody(schemas.MembreSchema),MembreController.AddMembre)
module.exports = router;
