const propertyCollection = require("../model/propertyCollection");

module.exports = {
  manageComment: async (req, res) => {
    try {
      await propertyCollection.updateOne(
        { _id: req.body.id },
        { $push: { comments: req.body.data } }
      );
      res.sendStatus(200);
    } catch (err) {
        res.status(500).send(err)
    }
  },
};
