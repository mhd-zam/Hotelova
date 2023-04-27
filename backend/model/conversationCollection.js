const mongoose = require('mongoose')


const ConversationCollection = mongoose.Schema({
    conversation:Array
},{timestamps:true},
    { versionKey: false })
module.exports=mongoose.model('conversation',ConversationCollection)
