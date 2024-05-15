const User = require('../../../models/user')
const Helpers = require('../../../util/helper');


const helper = new Helpers();

// Forgot Password
exports.ChangeExpiredPassword = async (req, res) => {

  helper.log(req);

  const { email } = req.body; 

  try {
    // Find the user associated with the provided email
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res.status(404).json({ error: 'User does not exist' });
    }
    
    // Generate OTP
    const OTP = helper.generateOTP();

    user.expiredPassOtp = OTP

    await user.save();


    const emailResponse = await helper.sendEmail(email, `Your OTP for resetting expired password is ${OTP} click the link to reset your password http://localhost:5500/api/resetpassword`);
    if (!emailResponse.success) {
       res.status(500).json({ error: 'Failed to send OTP email' });
    }

    res.status(200).json({ message: 'OTP successfully sent to your email' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};