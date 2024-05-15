
const bcryptjs = require('bcryptjs');
const User = require('../../models/user')
const Helpers = require('../../util/helper');

// Instance of Helpers class
const helper = new Helpers();

// User REGISTRATION
exports.registerUser = async (req, res) => {

  // helper.log(req);

  const { name, email, phoneNumber,location,nationalId,  password } = req.body;

  try {
    // Check if the User is already registered
    const user = await User.findOne({ where: { email: email } });

    if (user) {

      console.log(" User already registered")
      return res.json(" User already registered in the Database")
    }

    // Generate OTP
    const otp = helper.generateOTP();

    // Hash the password
    const hashedPassword = bcryptjs.hashSync(password);

    // Expiration date (Days)
    const expirationDate = new Date();
    const validDays = 90;
    expirationDate.setDate(expirationDate.getDate() + validDays); 

    // Save User details with expiration date
    const unverifiedUser = new User({
      name,
      email,
      phoneNumber,
      password: hashedPassword,
      location,
      nationalId,
      passOtp : passOtp,
      isVerified: false,
      passwordExpirationDate: expirationDate,
      role : {
        'User': 1000,
        'Patient': 2000,
      },
      Permissions: {}
    });

    await unverifiedUser.save();

    console.log('User registered successfully');

    // Send email
    const emailResponse = await helper.sendEmail(email, `Your registration OTP is ${otp}`);
    if (!emailResponse.success) {
      return res.json( 'Failed to send OTP email');
    }

    return res.json('User registered, Check your email for otp');

  } catch (error) {
    console.error(error);
    res.json("notexist");
  }
};








    

