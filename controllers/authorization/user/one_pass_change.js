const User = require('../../../models/user')
const Helpers = require('../../../util/helper');
const bcryptjs = require('bcryptjs')


const helper= new Helpers();

exports.initialPasswordChange = async (req,res) => {

  helper.log(req);
  
  const { email, newPassword } = req.body;

  try {
    const user = await User.findOne({where: { email: email}});

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const hashedPassword = bcryptjs.hashSync(newPassword);

    //Update the password
    user.password = hashedPassword;
    user.isInitialPasswordChanged = true;

    await user.save();

    return res.status(200).json({ message: 'Password reset successfully' });

    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}