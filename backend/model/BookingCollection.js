const mongoose = require('mongoose')

const Bookings = mongoose.Schema({
    userid: mongoose.Schema.Types.ObjectId,
    hostid: mongoose.Schema.Types.ObjectId,
    propertyid: mongoose.Schema.Types.ObjectId,
    guest: {
        childrens:Number,
        adults:Number
    },
    totalprice: Number,
    Paymentstatus: String,
    checkin: Date,
    checkOut: Date,
    OrderStatus:String
},{timestamps:true},
    { versionKey: false })

module.exports=mongoose.model('Bookings',Bookings)