const mongoose = require('mongoose')

const PropertyModel = new mongoose.Schema({
    
        'PropertyName': String,
        Description:String,
        Address: String,
        coordinates: {
                lat: Number,
                log: Number     
        },
        'Price': Number,
        userid:mongoose.Schema.Types.ObjectId,
        RoomType: String,
        Facility: {},
        Amenties: {},
        images: [{type:String}],
    
})

module.exports=mongoose.model('propertyModel',PropertyModel)