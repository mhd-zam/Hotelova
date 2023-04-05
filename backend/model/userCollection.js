const mongoose = require('mongoose')

const userModel = new mongoose.Schema({
    username: String,
    phonenumber: String,
    email: String,
    otpAuth_id: String,
    address: {
        street: String,
        city: String,
        state: String,
        pincode: String,
        country: String,
        district:String
    },
    accessToken:String,
    ishosted:Boolean,
    blocked: Boolean,
    hostingApproval: Boolean
},{timestamps:true},
{ versionKey: false })

module.exports=mongoose.model('userModel',userModel)