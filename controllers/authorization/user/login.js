const User = require('../../../models/user')
// const Patient = require('../../../models/user_models/patient_model');
// const Chp = require('../../../models/user_models/chp_model');
// const Admin = require('../../../models/user_models/user_model');
// const SuperAdmin = require('../../../models/user_models/user_model');
// const Doctor = require('../../../models/user_models/doctor_model');
const dotenv = require('dotenv');
const bcryptjs = require('bcryptjs');
const Helpers = require('../../../util/helper');;

const helper = new Helpers();

dotenv.config();

// Define a map to track failed login attempts per user
const failedLoginAttempts = new Map();

exports.login = async (req, res) => {
  helper.log(req);

  try {
    const email = req.body.email;
    const password = req.body.password;

    // Find user by email
    let user = await User.findOne({ where: { email: email } });
    // let profileType = 'CHP';

    // if (!user) {
    //   user = await User.findOne({ where: { email: email } });
    //   profileType = 'PATIENT';
    // }

    // if (!user) {
    //   user = await Admin.findOne({ where: { email: email } });
    //   profileType = 'ADMIN';
    // }

    // if (!user) {
    //   user = await Doctor.findOne({ where: { email: email } });
    //   profileType = 'DOCTOR';
    // }

    // if (!user) {
    //   user = await SuperAdmin.findOne({ where: { email: email } });
    //   profileType = 'SUPERADMIN';
    // }

    if (!user) {
      return res.status(404).json({ error: 'Wrong email. Kindly confirm your email' });
    }

    /*
    res.status(404).json({ error: 'User does not exist' });
    return res.status(403).json({ error: 'You have exceeded the maximum number of login attempts. Please reset your password.' });
    return res.status(400).json({ error: 'Wrong password. Input the correct password or reset your password.' });
    return res.status(403).json({ error: 'Password expired! Please reset your password.' });
    return res.status(409).json({ error: 'Initial password change is required. Please change your password before logging in.' });
    res.status(500).json({ error: 'Internal Server Error' });
    */

    // Check if the user has exceeded the maximum number of login attempts
    // const failedAttempts = failedLoginAttempts.get(email) || 0;
    // if (failedAttempts == 3) {
    //   return res.status(403).json({ error: 'You have exceeded the maximum number of login attempts. Please click Forgot password below to reset your password.' });
    // }

    // Verify password
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      // Increment failed login attempts
      failedLoginAttempts.set(email, failedAttempts + 1);
      return res.status(403).json({ error: 'Wrong password. Input the correct password or reset your password.' });
    }

    // Clear failed login attempts upon successful login
    failedLoginAttempts.delete(email);

    // Check if password is expired
    if (user.isPasswordExpired) {
      return res.status(403).json({ error: 'Password expired! Please reset your password.', errorCode: 'ExpiredPassword'});
    }

    // if (profileType === 'CHP'  && !user.isInitialPasswordChanged || profileType === 'DOCTOR'  && !user.isInitialPasswordChanged || 
    //     profileType === 'EDITOR'  && !user.isInitialPasswordChanged || profileType === 'ADMIN'  && !user.isInitialPasswordChanged || profileType === 'ADMIN' && !user.isInitialPasswordChanged )
      {
      return res.status(409).json({ error: 'Initial password change is required. Please change your password before logging in.' });
    }

    // Generate Access and Refresh Tokens
    const tokenResponse = await helper.generateTokens(user);
    if (!tokenResponse.success) {
      return res.status(500).json({ error: tokenResponse.error });
    }

    const accessToken = tokenResponse.accessToken;
    const refreshToken = tokenResponse.refreshToken;

    res.setHeader('Authorization', `Bearer ${accessToken}`);
    res.setHeader('Refresh-Token', `Bearer ${refreshToken}`);
      
    return res.status(200).json(tokenResponse);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


