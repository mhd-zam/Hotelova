const mongoose = require('mongoose')

const PropertyAminities = mongoose.Schema({
    ProductName: String,
    image:Array
})

module.exports=mongoose.model('Aminities',PropertyAminities)