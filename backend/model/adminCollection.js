const mongoose = require('mongoose')

const adminModel = new mongoose.Schema({
    username: String,
    password: String,
    accessToken:String
})

module.exports=mongoose.model('adminModel',adminModel)