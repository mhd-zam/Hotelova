const mongoose = require('mongoose')

const RoomType = mongoose.Schema({
    RoomType: String,
    image:Array
})

module.exports=mongoose.model('RoomType',RoomType)