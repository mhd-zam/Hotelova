const property = require("../model/propertyCollection");
const formDataToObject = require("form-data-to-object");
const RoomTypeCollection = require("../model/RoomtypeCollection");
const aminitiesCollection = require("../model/aminitiesCollection");
const propertyCollection = require("../model/propertyCollection");

module.exports = {
  addproperty: async (req, res) => {
    const parsedFormData = formDataToObject.toObj(req.body);

    for (let key in parsedFormData.Facility) {
      let value = parsedFormData.Facility[key];
      parsedFormData.Facility[key] = parseInt(value);
    }

    for (let key in parsedFormData.coordinates) {
      let value = parsedFormData.coordinates[key];
      parsedFormData.coordinates[key] = parseFloat(value);
    }

    let value = parsedFormData["Price"];

    parsedFormData["Price"] = parseInt(value);

    for (let key in parsedFormData.Amenties) {
      let value = parsedFormData.Amenties[key];
      if (value === "true") {
        parsedFormData.Amenties[key] = true;
      } else {
        parsedFormData.Amenties[key] = false;
      }
    }

    let img = req.files.map((item) => item.location);
    parsedFormData["images"] = img;

    let result = await property.create(parsedFormData);

    console.log(result);

    res.status(200).send({ img: req.files });
  },
  EditProperty: async (req, res) => {
    const parsedFormData = formDataToObject.toObj(req.body);
    for (let key in parsedFormData.Facility) {
      let value = parsedFormData.Facility[key];
      parsedFormData.Facility[key] = parseInt(value);
    }

    for (let key in parsedFormData.coordinates) {
      let value = parsedFormData.coordinates[key];
      parsedFormData.coordinates[key] = parseFloat(value);
    }

    let value = parsedFormData["Price"];
    parsedFormData["Price"] = parseInt(value);

    for (let key in parsedFormData.Amenties) {
      let value = parsedFormData.Amenties[key];
      if (value === "true") {
        parsedFormData.Amenties[key] = true;
      } else {
        parsedFormData.Amenties[key] = false;
      }
    }
    console.log(parsedFormData);

    if (req.files) {
      let img = req.files.map((item) => item.location);
      if (!parsedFormData.images) {
        parsedFormData.images = [];
      }
      img.forEach((image) => {
        parsedFormData["images"].push(image);
      });
    }

    console.log(parsedFormData["images"]);

    await propertyCollection.replaceOne(
      { _id: req.body.Proid },
      parsedFormData
    );

    res.sendStatus(200);
  },

  getAllproperty: async (req, res) => {
    try {
      let Property = await property.aggregate(
        [
          { $match: {} },
        {
          $lookup: {
            from: "hostdetails",
            localField: "userid",
            foreignField: "userid",
            as: "host",
          }
          },
          {
            $addFields: {
          host:{$arrayElemAt:['$host',0]}
        }}
        ]
      )

      console.log(Property);
      

      res.status(200).json(Property);
    } catch (err) {
      console.log(err);
    }
  },
  removeProperty: async (req, res) => {
    try {
      await property.deleteOne({ _id: req.params.id });
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
    }
  },

  addRoomType: async (req, res) => {
    try {
      let img = req.file.location;
      req.body.image = [img];
      await RoomTypeCollection.create(req.body);
      res.sendStatus(200);
    } catch (err) {
      res.sendStatus(403);
    }
  },
  getRoomType: async (req, res) => {
    try {
      let RoomType = await RoomTypeCollection.find({});
      console.log(RoomType);
      res.status(200).json(RoomType);
    } catch (err) {}
  },
  removeRoomType: async (req, res) => {
    try {
      await RoomTypeCollection.deleteOne({ _id: req.params.id });
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
    }
  },
  editRoomType: async (req, res) => {
    try {
      console.log(req.body);
      let result = await RoomTypeCollection.findOne({ _id: req.body._id });
      if (result) {
        if (req.file) {
          let img = req.file.location;
          req.body.image = [img];
        }
        await RoomTypeCollection.updateOne(
          { _id: req.body._id },
          { $set: req.body }
        );
        res.sendStatus(200);
        return;
      }
      throw new Error();
    } catch (err) {
      console.log(err);
    }
  },
  addAmenties: async (req, res) => {
    try {
      let img = req.file.location;
      req.body.image = [img];
      await aminitiesCollection.create(req.body);
      res.sendStatus(200);
    } catch (err) {}
  },
  getAmenities: async (req, res) => {
    try {
      let result = await aminitiesCollection.find({});
      res.status(200).json(result);
    } catch (err) {
      res.status(400).send({ message: "not found" });
    }
  },
  removeAmenities: async (req, res) => {
    try {
      await aminitiesCollection.deleteOne({ _id: req.params.id });
      res.sendStatus(200);
    } catch (err) {
      res.status(403).send("error occured");
    }
  },
  editAmenties: async (req, res) => {
    try {
      let result = await aminitiesCollection.findOne({ _id: req.body._id });
      if (result) {
        if (req.file) {
          let img = req.file.location;
          req.body.image = [img];
        }
        await aminitiesCollection.updateOne(
          { _id: req.body._id },
          { $set: req.body }
        );
        res.sendStatus(200);
        return;
      }
      throw new Error();
    } catch (err) {
      res.status(403).send(err);
    }
  },
};
