

const User = require('../../models/user');
const Helper = require('../../util/helper');

const helper = new Helper();


exports.verifyOtpAndSaveUser = async (req, res) => {

  // helper.log(req);

  const { enteredOtp } = req.body;

  try {
    // Find the User associated with the provided OTP
    const user = await User.findOne({ where: { passOtp: enteredOtp } });

    // Check if User found
    if (!User) {
      return res.status(404).json({ error: 'User with the provided OTP not found' });
    }
    
    if (user.passOtp !== enteredOtp) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }
    
    // Update isVerified to true
    user.isVerified = true;

    // Delete OTP after acc verification
    await user.update({ passOtp: null });
  
    await user.save();

    console.log('Account verified successfully')
    return res.status(200).json('Account verified successfully');

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


