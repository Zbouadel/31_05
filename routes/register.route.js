const express = require('express');
const router = express.Router();
const { validateBody, schemas } = require('../helpers/validation.helper');
const AccountController = require('../controllers/account.controller')
router.route('/membre')
    .get((req,res)=>{
        res.render('register.ejs');
      })
   .post(validateBody(schemas.RegisterMembreSchema),AccountController.addMembre);
router.route('/drivingschool')
    .get((req,res)=>{
      res.render('schoolregister.ejs');
    })
    .post(validateBody(schemas.RegisterDrivingSchoolSchema),AccountController.addDrivingSchool);

router.route('/').get(async(req,res)=>{res.redirect('/register/membre')});

module.exports = router;
