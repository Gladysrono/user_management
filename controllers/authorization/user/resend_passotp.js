const User = require('../../../models/user')
const Helpers = require('../../../util/helper');

// Create an instance of the Helpers class
const helper = new Helpers();

// Function to resend OTP to a User
exports.resendPasswordOtpUser = async (req, res) => {

  helper.log(req);
  
  const { email } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Generate a new OTP
    const otp = helper.generateOTP();

    // Update user's OTP in the database
    user.passOtp = otp;
    await user.save();

    // Send email with new OTP
    const emailResponse = await helper.sendEmail(email, `Your new OTP is ${otp}`);

    if (!emailResponse.success) {
      return res.status(500).json({ error: 'Failed to resend OTP email' });
    }

    res.status(200).json({ message: 'OTP resent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
