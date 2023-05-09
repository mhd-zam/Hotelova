const mongoose = require('mongoose')

const PropertyModel = new mongoose.Schema({
    
        PropertyName: String,
        Description:String,
        Address: String,
        coordinates: {
                lat: Number,
                log: Number     
        },
        Price: Number,
        Maxguest:Number,
        hostid:mongoose.Schema.Types.ObjectId,
        RoomType: String,
        Facility: {},
        Amenties: {},
        comments:[],
        images: [{type:String}],
    
})

PropertyModel.index({ Address: 'text' });

module.exports=mongoose.model('propertyModel',PropertyModel)