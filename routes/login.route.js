const express = require('express')
const router = express.Router()
const LoginController = require('../controllers/login.controller')
const { validateBody, schemas } = require('../helpers/validation.helper');


router.route('/')
    .get((req,res)=>{
        res.render('login.ejs');
      })
      .post(validateBody(schemas.LoginSchema),LoginController.connectUser);

module.exports = router;
        
        
        // try {
        //     if((req, res, next) => {
        //         const result = schema.validate({
        //           name:req.body.name,
        //           email:req.body.email,
        //           password:req.body.password
        //       });
        //         if (result.error) {
        //             return res.status(400).json({ msg: 'Invalide data was provided', error: result.error });
        //         } else {
        //             next();
        //         }
        //     }){
        //         const dataInstance = new RegisterModel({
        //             name:req.name,
        //             email:req.email,
        //             password:req.password
        //         });
        //         const instance = await dataInstance.save()
        //         res.status(201).json(instance);
        //     }
        // } catch (error) {
        //     res.status(400).json(error);
        // }