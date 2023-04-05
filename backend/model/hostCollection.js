const mongoose = require('mongoose')

const hostdetails = mongoose.Schema({
    FullName: String,
    userid:mongoose.Schema.Types.ObjectId,
    DateOfBirth: String,
    AadharNumber: String,
    Address: String,
    PanCard:String,
    RentalLicensePermit:String
})

module.exports=mongoose.model('HostDetails',hostdetails)