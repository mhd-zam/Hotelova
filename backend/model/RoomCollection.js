const mongoose = require('mongoose')

const RoomsCollection = new mongoose.Schema({
    PropertyId: mongoose.Schema.Types.ObjectId,
    RoomNo: Number,
    DatesNotAvailable:Array
})

module.exports=mongoose.model('RoomsCollection',RoomsCollection)