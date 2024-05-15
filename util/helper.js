const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');
// const dotenv = require('dotenv');
// const fs = require('fs');
// const path = require('path');
// const { DateTime } = require('luxon');
// const os = require('os');
// const jwt = require('jsonwebtoken');

// dotenv.config();

class Helpers {


  generateOTP() {
    return otpGenerator.generate(4, {
      digits: true,
      alphabets: false,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      uppercase: false,
      specialChars: false
    });
  }

//   generateTransactionId() {
//     return otpGenerator.generate(8, {
//       digits: true,
//       alphabets: true,
//       lowerCaseAlphabets: false,
//       upperCaseAlphabets: true,
//       uppercase: true,
//       specialChars: false
//     });
//   }

  async sendEmail(email, message) {
    // Send OTP email
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.PASSWORD
      },
      
    });

    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: 'Verification OTP',
      text: `${message}`,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', info.response);
      return { success: true, message: 'OTP sent successfully' };
    } catch (error) {
      console.error('Error sending email:', error);
      return { success: false, error: 'Failed to send OTP email' };
    }
  }

//   async log(req, res) {
//     try {
//       const currentDate = DateTime.local().toFormat('yyyy-MM-dd');
//       const logFileName = `${currentDate}-request.log`;
//       const logFilePath = path.join(__dirname, `../util/log/${logFileName}`);
//       const hostName = os.hostname();
//       const logString = `[${DateTime.local().toFormat('yyyy-MM-dd hh.mm.ss a')}] => method: ${req.method} uri: ${req.path} queryString: ${encodeURIComponent(req.url)} protocol: ${req.protocol} remoteAddr: ${req.ip} remotePort: ${req.connection.remotePort} userAgent: ${req.headers['user-agent']} hostname:${hostName}`;

//       // Check if the directory exists, if not create it
//       await fs.promises.mkdir(path.dirname(logFilePath), { recursive: true });

//       const mode = await fs.promises.access(logFilePath, fs.constants.F_OK)
//         .then(() => 'a')
//         .catch(() => 'w');

//       await fs.promises.writeFile(logFilePath, logString + '\n', { flag: mode });

//       return logString;
//     } catch (error) {
//       console.error(error);
//       // Handle error accordingly
//     }
//   }

//   async getLogsForDate(date) {
//     try {
//       const currentDate = DateTime.local().toFormat('yyyy-MM-dd');
//       const logFileName = `${currentDate}-request.log`;
//       const logFilePath = path.join(__dirname, `../util/log/${logFileName}`);
//       const logContent = await fs.promises.readFile(logFilePath, 'utf-8');
//       const logLines = logContent.split('\n');
//       const logsForDate = logLines.filter(logLine => logLine.includes(date));
//       return logsForDate.join('\n');
//     } catch (error) {
//       console.error(error);
//       throw new Error('Error retrieving logs for the specified date');
//     }
//   }

//   async getLogsForLogin(date) {
//     try {
//       const currentDate = DateTime.local().toFormat('yyyy-MM-dd');
//       const logFileName = `${currentDate}-request.log`;
//       const logFilePath = path.join(__dirname, `../util/log/${logFileName}`);
//       const logContent = await fs.promises.readFile(logFilePath, 'utf-8');
//       const logLines = logContent.split('\n');
//       console.log(logLines)
//       const logsForLogin = logLines.filter(logLine => {
//         return logLine.includes(date) && logLine.includes('method: POST') && logLine.includes('uri: /login');
//       });
//       console.log(logsForLogin)
//       return logsForLogin.join('\n');
//     } catch (error) {
//       console.error(error);
//       throw new Error('Error retrieving login logs');
//     }
//   }
  
  

//   async generateTokens(user) {
//     try {
//       const role = Object.values(user.role);
//       const profileType = user.profileType;

//       const accessToken = jwt.sign(
//         {
//           "userInfo": {
//             "name": user.name,
//             "email": user.email,
//             "role": role,
//             "profileType": profileType
//           }
//         },
//         process.env.JWT_ACCESS_SECRET,
//         { expiresIn: '90s' }
//       );

//       const refreshToken = jwt.sign(
//         {
//           "userInfo": {
//             "name": user.name,
//             "email": user.email,
//             "profileType": profileType
//           }
//         },
//         process.env.JWT_REFRESH_SECRET,
//         { expiresIn: '1d' }
//       );

//       return { success: true, message: user.name + ' (' + user.profileType + ') ' + ' Logged in Successful', accessToken, refreshToken };
//     } catch (error) {
//       console.log(error);
//     }
//   }


//   constructor() {

//     this.lastGeneratedNumber =0;
//   }
//   generateUniqueIdentifier(letter) {
    
//     this.lastGeneratedNumber++;

//     const sequentialNumber  = String(this.lastGeneratedNumber).padStart(5,'0');

//     return `${letter}${sequentialNumber}`;
  
// }
}

module.exports = Helpers;
