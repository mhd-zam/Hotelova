const property = require("../model/propertyCollection");
const formDataToObject = require("form-data-to-object");
const RoomTypeCollection = require("../model/RoomtypeCollection");
const aminitiesCollection = require("../model/aminitiesCollection");
const propertyCollection = require("../model/propertyCollection");
const userCollection = require("../model/userCollection");
const RoomCollection = require("../model/RoomCollection");
const { default: mongoose } = require("mongoose");
const {
  DeleteObjectsCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const { s3 } = require("./multer");

module.exports = {
  addproperty: async (req, res) => {
    try {
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

      let max = parsedFormData["Maxguest"];

      parsedFormData["Maxguest"] = parseInt(max);

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
      let totalRoom = result["Facility"]["Bedrooms"];

      const RoomDocument = [];

      for (let i = 1; i <= totalRoom; i++) {
        RoomDocument.push({
          PropertyId: result._id,
          RoomNo: i,
          DatesNotAvailable: [],
        });
      }
      await RoomCollection.insertMany(RoomDocument);

      res.status(200).send({ img: req.files });
    } catch (err) {
      res.status(500).send(err);
    }
  },
  EditProperty: async (req, res) => {
    try {
      const parsedFormData = formDataToObject.toObj(req.body);
      for (let key in parsedFormData.Facility) {
        let value = parsedFormData.Facility[key];
        parsedFormData.Facility[key] = parseInt(value);
      }

      for (let key in parsedFormData.coordinates) {
        let value = parsedFormData.coordinates[key];
        parsedFormData.coordinates[key] = parseFloat(value);
      }

      parsedFormData.NotAvailable = {};
      let Room = parsedFormData.Facility["Bedrooms"];

      for (let i = 1; i <= Room; i++) {
        parsedFormData["NotAvailable"][`Room${i}`] = [];
      }

      let value = parsedFormData["Price"];
      parsedFormData["Price"] = parseInt(value);

      let max = parsedFormData["Maxguest"];

      parsedFormData["Maxguest"] = parseInt(max);

      for (let key in parsedFormData.Amenties) {
        let value = parsedFormData.Amenties[key];
        if (value === "true") {
          parsedFormData.Amenties[key] = true;
        } else {
          parsedFormData.Amenties[key] = false;
        }
      }

      if (req.files) {
        let img = req.files.map((item) => item.location);
        if (!parsedFormData.images) {
          parsedFormData.images = [];
        }
        img.forEach((image) => {
          parsedFormData["images"].push(image);
        });
      }

      await propertyCollection.replaceOne(
        { _id: req.body.Proid },
        parsedFormData
      );

      let result = await propertyCollection.findOne({ _id: req.body.Proid });

      let totalRoom = result["Facility"]["Bedrooms"];

      let RoomCount = await RoomCollection.find({
        PropertyId: result._id,
      }).count();

      if (totalRoom < RoomCount) {
        let diffCount = RoomCount - totalRoom;
        for (let i = 1; i <= diffCount; i++) {
          await RoomCollection.deleteOne({ _id: result._id });
        }
      } else if (totalRoom > RoomCount) {
        let diffCount = totalRoom - RoomCount;
        console.log(diffCount);
        const RoomDocument = [];

        for (let i = 1; i <= diffCount; i++) {
          RoomDocument.push({
            PropertyId: result._id,
            RoomNo: i,
            DatesNotAvailable: [],
          });
        }
        await RoomCollection.insertMany(RoomDocument);
      }
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },

  getAllproperty: async (req, res) => {
    let limit = parseInt(req.query.limit);
    let page = parseInt(req.query.page);

    let skip = page * limit;
    let count = await propertyCollection.count();
    try {
      let Property = await property.aggregate([
        { $match: {} },
        {
  $addFields: {
    avgRating: {
      $trunc: [
        { $avg: { $map: { input: "$comments", in: "$$this.rating" } } },
        1
        ]
        }
        }
        },
        {
          $lookup: {
            from: "hostdetails",
            localField: "hostid",
            foreignField: "userid",
            as: "host",
          },
        },
        {
          $addFields: {
            host: { $arrayElemAt: ["$host", 0] },
            wishlist: false,
          },
        },
        { $skip: skip },
        { $limit: limit },
      ]);
      res.status(200).json(Property);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  removeProperty: async (req, res) => {
    try {
      let doc = await property.findByIdAndDelete({ _id: req.params.id });
      // console.log(doc.images.map((item)=>item.slice(item.lastIndexOf('/')+1)))
      const params = {
        Bucket: "hotelova",
        Delete: {
          Objects: doc.images.map((item) => ({
            Key: item.slice(item.lastIndexOf("/") + 1),
          })),
        },
      };

      const command = new DeleteObjectsCommand(params);

      s3.send(command, function (err, data) {
        if (err) {
          console.log("Error deleting object:", err);
        } else {
          console.log("Object deleted successfully");
        }
      });

      await RoomCollection.deleteMany({
        PropertyId: req.params.id,
      });
      res.sendStatus(200);
    } catch (err) {
      res.status(500).send(err);
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
      res.status(200).json(RoomType);
    } catch (err) {}
  },
  removeRoomType: async (req, res) => {
    try {
      const doc = await RoomTypeCollection.findByIdAndDelete({
        _id: req.params.id,
      });
      const params = {
        Bucket: "hotelova",
        Key: doc.image[0],
      };
      const command = new DeleteObjectCommand(params);

      s3.send(command, (err, data) => {
        if (err) {
          console.log("Error deleting object:", err);
        } else {
          console.log("Object deleted successfully");
        }
      });
      res.sendStatus(200);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  editRoomType: async (req, res) => {
    try {
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
      res.status(500).send(err);
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
      const doc = await aminitiesCollection.findByIdAndDelete({
        _id: req.params.id,
      });
      const params = {
        Bucket: "hotelova",
        Key: doc.image[0],
      };
      const command = new DeleteObjectCommand(params);

      s3.send(command, (err, data) => {
        if (err) {
          console.log("Error deleting object:", err);
        } else {
          console.log("Object deleted successfully");
        }
      });
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
  searchProperty: async (req, res) => {
    const destinationtoArray = req.query.destination.split(",");
    const destination = destinationtoArray[0];
    const startdate = req.query.checkin;
    const endDate = req.query.checkout;
    const minPrice = parseInt(req.query.minPrice);
    const maxPrice = parseInt(req.query.maxPrice);
    let propertyType = req.query.propertyType;
    if (propertyType === "All") {
      propertyType = { $exists: true };
    } else {
      propertyType = propertyType.trim();
    }
    try {
      let result = await propertyCollection.aggregate([
        { $match: { $text: { $search: destination, $caseSensitive: false } } },
        {
          $lookup: {
            from: "roomscollections",
            localField: "_id",
            foreignField: "PropertyId",
            as: "Room",
          },
        },
        {
          $match: { "Room.DatesNotAvailable": { $nin: [startdate, endDate] } },
        },
        { $match: { RoomType: propertyType } },
        {
          $lookup: {
            from: "hostdetails",
            localField: "hostid",
            foreignField: "userid",
            as: "host",
          },
        },
        {
          $addFields: {
            host: { $arrayElemAt: ["$host", 0] },
            wishlist: false,
          },
        },
        { $match: { Price: { $gte: minPrice, $lte: maxPrice } } },
      ]);
      let Price = await propertyCollection.aggregate([
        {
          $group: {
            _id: null,
            maxAmt: { $max: "$Price" },
            minAmt: { $min: "$Price" },
          },
        },
      ]);
      res
        .status(200)
        .json({ result, maxAmt: Price[0].maxAmt, minAmt: Price[0].minAmt });
    } catch (err) {
      res.status(200).send(err);
    }
  },
  findRoomAvailability: async (req, res) => {
    const { startDate, endDate, id } = req.body;
    try {
      let result = await RoomCollection.aggregate([
        { $match: { PropertyId: new mongoose.Types.ObjectId(id) } },
        { $match: { DatesNotAvailable: { $nin: [startDate, endDate] } } },
      ]);
      res.status(200).send(result);
    } catch (err) {
      console.log(err);
      res.status(500).send("internal error");
    }
  },
  gethostlistedProperty: async (req, res) => {
    try {
      console.log(req.query);
      const result = await propertyCollection.find({
        hostid: req.query.userid,
      });
      res.status(200).json(result);
    } catch (Err) {
      res.status(500).send();
    }
  },
};
