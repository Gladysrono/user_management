const express = require('express');
const router = require('express').Router();
const { registerUser } = require('../controllers/authorization/user_registration');
const { verifyOtpAndSaveUser } = require('../controllers/authorization/otp _verification');
const { initialPasswordChange } = require('../controllers/authorization/user/one_pass_change');
const { ForgotPassword } = require('../controllers/authorization/user/forgot_password');
const { resetPassword } = require('../controllers/authorization/user/reset_password');
const { ChangeExpiredPassword } = require('../controllers/authorization/user/change_expired_password');
const { resendExpiredPasswordOtpChp } = require('../controllers/authorization/user/resend_expired_passotp');
const { resendPasswordOtpUser } = require('../controllers/authorization/user/resend_passotp');
const { resetExpiredPassword } = require('../controllers/authorization/user/reset_expired_password');
const { login } = require('../controllers/authorization/user/login');


router.post('/users/register',registerUser);
// router.post('/users/regenerate',regenerateOTP);
router.post('/users/verify',verifyOtpAndSaveUser);
router.put('/users/changepassword',initialPasswordChange )
router.post('/users/forgotpassword', ForgotPassword);
router.put('/users/resetpassword', resetPassword);
router.post('/users/changexpiredpassword' , ChangeExpiredPassword);
router.put('/users/resetexpiredpassword',resetExpiredPassword );
router.post('/users/resendexpiredpassotp',resendExpiredPasswordOtpChp);
router.post('/users/resendpassotp', resendPasswordOtpUser);

router.post('/auth/login',login); 


module.exports = router;







   
