const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const router = require('./routes/route');
// const otpRoutes = require('./routes/otpRoute');
require('dotenv').config();

console.log('Your API Key is:', process.env.API_KEY);

const rawPassword = "gladys1";  // Replace with your actual password
const encodedPassword = encodeURIComponent(rawPassword);
console.log(encodedPassword);  // Outputs the encoded password




const app = express();
app.use(express.json());


// Connect to MongoDB using the connection URL from environment variables
mongoose.connect( "mongodb+srv://gladyschepkoech408:gladys1@cluster0.h1zxbu4.mongodb.net/healthtech?retryWrites=true&w=majority")
  .then(() => console.log('Successfully connected to MongoDB.'))
  .catch(err => console.error('Connection error:', err));
    // Set up routes
app.use('/api', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
