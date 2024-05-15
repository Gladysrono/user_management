const mongoose= require('mongoose');


const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:false
    },
    email:{
        type:String,
        required:true
    },

    phoneNumber:{
        type:String,
        required:false
    },
    nationalId:{
        type:String,
        unique:true,
        required:false
    },
    location:{
        type:String,
        required:false
    },
    password:{
        type:String,
        required:true

    // },
    // passwordExpirationDate: {
    //     type: Date,
    //     required: true
    },
    passOtp: {
        type: String,
        default: null
    },
    // expiredPassOtp: {
    //     type: String,
    //     default: null
    // },
    profileType: {
        type: String,
        required: false
    }
    // role: {
    //     type: String,
    //     default: 'User'
    // },
    // permissions: {
    //     type: mongoose.Schema.Types.Mixed,
    //     default: {}
    // },
    // seenNotifications: {
    //     type: String,
    //     default: '[]'
    // },
    // unSeenNotifications: {
    //     type: String,
    //     default: '[]'
    // },
    // profileImage: {
    //     type: String,
    //     default: null
    // },
    // backgroundImage: {
    //     type: String,
    //     default: null
    // }
})



    

module.exports =mongoose.model('User',userSchema);