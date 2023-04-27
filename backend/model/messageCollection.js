const mongoose = require("mongoose");

const messageCollection = mongoose.Schema(
  {
    conversationid: mongoose.Schema.Types.ObjectId,
    senderid: mongoose.Schema.Types.ObjectId,
    text: String,
  },
  { timestamps: true },
  { versionKey: false }
);
module.exports = mongoose.model("message", messageCollection);
