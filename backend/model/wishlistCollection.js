const mongoose = require('mongoose')

const wishlistCollection = mongoose.Schema({
    userid:String,
    wishlist:Array
})

module.exports=mongoose.model('wishlist',wishlistCollection)