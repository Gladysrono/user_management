const express = require('express');
const router = require('express').Router();
const { registerUser } = require('../controllers/authorization/user_registration');
const { verifyOtpAndSaveUser } = require('../controllers/authorization/otp _verification');

router.post('/users/register',registerUser);
// router.post('/users/regenerate',regenerateOTP);
router.post('/users/verify',verifyOtpAndSaveUser);

// router.post('/auth/login',loginUser); 


module.exports = router;







   
