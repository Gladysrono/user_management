
const bcryptjs = require('bcryptjs');
const User = require('../../../models/user')
const Helpers = require('../../../util/helper');

const helper= new Helpers();

// Reset Password
exports.resetExpiredPassword = async (req, res) => {

  helper.log(req);
  
  const { resetCode, password } = req.body;

  try {

    // Find the user associated with the provided OTP
    const user = await User.findOne({ where: { expiredPassOtp: resetCode } });

    // Check if user found
    if (!user) {
      return res.status(404).json({ error: 'User not found with the provided OTP' });
    }

    const newUser =  await User.findOne({ where: { expiredPassOtp: resetCode } });
    const hashedPassword = bcryptjs.hashSync(password);

    // Change the password
    newUser.password = hashedPassword;
    
    
    await newUser.save();

    return res.status(200).json({ message: 'Expired Password reset successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred' });
  }
};
