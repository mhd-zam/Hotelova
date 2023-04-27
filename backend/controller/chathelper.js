const { default: mongoose } = require("mongoose");
const conversationCollection = require("../model/conversationCollection");
const messageCollection = require("../model/messageCollection");
module.exports = {
  addConversation: async (req, res) => {

    const conversation = new conversationCollection({
      conversation: [
        new mongoose.Types.ObjectId(req.body.senderid),
        new mongoose.Types.ObjectId(req.body.receiverid),
      ],
    });
    let findIfExsist = await conversationCollection.findOne({conversation:{$all:[new mongoose.Types.ObjectId(req.body.senderid),new mongoose.Types.ObjectId(req.body.receiverid)]}})
    try {
      if (!findIfExsist) {
        let result = await conversation.save();
      }
      res.status(200).send('ok')
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getAllConversation: async (req, res) => {
    try {
      let result = await conversationCollection.aggregate([
        {
          $match: {
            conversation: {
              $in: [new mongoose.Types.ObjectId(req.params.userid)],
            },
          },
        },
        { $unwind: "$conversation" },
        {
          $match: {
            conversation: {
              $ne: new mongoose.Types.ObjectId(req.params.userid),
            },
          },
        },
        {
          $lookup: {
            from: "usermodels",
            localField: "conversation",
            foreignField: "_id",
            as: "receiverDetails",
          },
        },
        {
          $addFields: {
            receiverDetails: { $arrayElemAt: ["$receiverDetails", 0] },
          },
        },
        {
          $addFields: {
            receiverid: "$conversation",
            receiverName: "$receiverDetails.username",
            conversationid:'$_id'
          },
        },
        {
          $project: {
            receiverid: 1,
            receiverName: 1,
            conversationid: 1,
            _id:0
          },
        },
      ]);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  addMessages: async (req, res) => {
    const message = new messageCollection({
      conversationid: req.body.conversationid,
      senderid: req.body.senderid,
      text: req.body.text,
    });

    try {
      let result = await message.save();
      res.status(200).json(result);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getMessages: async (req, res) => {
    try {
      let response = await messageCollection.find({
        conversationid: req.params.conversationid,
      });
      res.status(200).json(response);
    } catch (err) {
      res.status(400).send(err);
    }
  },
};
