const express = require('express');
const router = express.Router();
const VerificationController = require('../controllers/verification.controller');

router.route('/')
    .get(VerificationController.verifyUser)
module.exports = router;
