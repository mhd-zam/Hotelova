const users = require("../model/userCollection");
const admin = require("../model/adminCollection");
const jwt = require("jsonwebtoken");
const BookingCollection = require("../model/BookingCollection");
const propertyCollection = require("../model/propertyCollection");
require("dotenv").config();

module.exports = {
  login: async (req, res) => {
    try {
      let result = await admin.findOne(req.body);
      if (result) {
        let accessToken = jwt.sign(
          { username: result.username },
          process.env.ACCESS_TOKEN_SECRET_ADMIN,
          { expiresIn: "2d" }
        );
        await admin.updateOne({ _id: result._id }, { $set: { accessToken } });
        res.status(200).send({token:accessToken})
        return;
      }
    } catch (err) {
      res.sendStatus(403);
    }
  },
  userlist: async (req, res) => {
    try {
      let limit = parseInt(req.query.limit);
      let page = parseInt(req.query.page);
      let skip = page * limit;
      let count = await users.count();
      let list = await users.aggregate([
        { $match: {} },
        {
          $project: {
            _id: 1,
            username: 1,
            phonenumber: 1,
            email: 1,
            ishosted: 1,
            blocked: 1,
          },
        },
        { $skip: skip },
        { $limit: limit },
        { $sort: { _id: 1 } },
      ]);

      res.status(200).json({ list: list, count: count });
    } catch (err) {
      res.sendStatus(403);
    }
  },
  blockunblock: async (req, res) => {
    try {
      await users.updateOne({ _id: req.params.id }, [
        { $set: { blocked: { $eq: [false, "$blocked"] } } },
      ]);
      res.sendStatus(200);
    } catch (err) {
      res.sendStatus(500);
    }
  },
  hostRequestuser: async (req, res) => {
    try {
      let result = await users.aggregate([
        { $match: { hostingApproval: true, ishosted: false } },
        {
          $lookup: {
            from: "hostdetails",
            localField: "_id",
            foreignField: "userid",
            as: "hostdetails",
          },
        },
        {
          $project: {
            email: 1,
            phonenumber: 1,
            hostdetails: { $arrayElemAt: ["$hostdetails", 0] },
          },
        },
        {
          $project: {
            email: 1,
            phonenumber: 1,
            DateOfBirth: "$hostdetails.DateOfBirth",
            FullName: "$hostdetails.FullName",
            AadharNumber: "$hostdetails.AadharNumber",
            RentalLicensePermitid: "$hostdetails.RentalLicensePermit",
            PanCard: "$hostdetails.PanCard",
          },
        },
      ]);

      res.status(200).json(result);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  approvehost: async (req, res) => {
    try {
      await users.updateOne({ _id: req.params.id }, { ishosted: true });
      res.sendStatus(200);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getBookings: async (req, res) => {
    try {
      let result = await BookingCollection.aggregate([
        { $match: {} },
        {
          $lookup: {
            from: "usermodels",
            localField: "hostid",
            foreignField: "_id",
            as: "hostDetails",
          },
        },
        {
          $addFields: { hostDetails: { $arrayElemAt: ["$hostDetails", 0] } },
        },
        {
          $lookup: {
            from: "usermodels",
            localField: "userid",
            foreignField: "_id",
            as: "userdetails",
          },
        },
        { $addFields: { userdetails: { $arrayElemAt: ["$userdetails", 0] } } },
        {
          $lookup: {
            from: "propertymodels",
            localField: "propertyid",
            foreignField: "_id",
            as: "propertyDetails",
          },
        },
        {
          $addFields: {
            propertyDetails: { $arrayElemAt: ["$propertyDetails", 0] },
            Action: {
              $cond: {
                if: {
                  $or: [
                    { $eq: ["$OrderStatus", "Booking Confirmed"] },
                    { $eq: ["$OrderStatus", "Booking pending"] },
                  ],
                },
                then: true,
                else: false,
              },
            },
          },
        },
        {
          $project: {
            PropertyName: "$propertyDetails.PropertyName",
            HostName: "$hostDetails.username",
            HostPhone: "$hostDetails.phonenumber",
            GuestName: "$userdetails.username",
            GuestPhone: "$userdetails.phonenumber",
            Checkin: {
              $dateToString: { format: "%d-%m-%Y", date: "$checkin" },
            },
            Checkout: {
              $dateToString: { format: "%d-%m-%Y", date: "$checkOut" },
            },
            BookingStatus: "$OrderStatus",
            NumberOfGuest: "$guest",
            TotalAmount: "$totalprice",
            Action: 1,
          },
        },
      ]);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).send(res);
    }
  },
  getDashboardData: async (req, res) => {
    let allData = {};
    try {
      const newUserPerDay = await users.aggregate([
        { $match: {} },
        {
          $addFields: {
            CreatedAt: {
              $dateToString: { format: "%d-%m-%Y", date: "$createdAt" },
            },
          },
        },
        {
          $group: {
            _id: "$CreatedAt",
            total: { $count: {} },
            alldocument: { $push: "$$ROOT" },
          },
        },
        { $addFields: { date: "$alldocument.createdAt" } },
        {
          $project: { date: { $arrayElemAt: ["$date", 0] }, _id: 1, total: 1 },
        },
        { $sort: { date: 1 } },
        {$limit:7}
      ]);
      allData["newUserPerDay"] = newUserPerDay;
      const totalBookingPerDay = await BookingCollection.aggregate([
        { $match: {} },
        {
          $addFields: {
            CreatedAt: {
              $dateToString: { format: "%d-%m-%Y", date: "$createdAt" },
            },
          },
        },
        {
          $group: {
            _id: "$CreatedAt",
            total: { $count: {} },
            alldocument: { $push: "$$ROOT" },
          },
        },
        { $addFields: { date: "$alldocument.createdAt" } },
        {
          $project: { date: { $arrayElemAt: ["$date", 0] }, _id: 1, total: 1 },
        },
        { $sort: { _id: 1 } },
        { $limit: 4 },
      ]);
      allData["totalBookingPerDay"] = totalBookingPerDay;
      const totalNumberOfProperty = await propertyCollection.count();
      const totalNumberOfHost = await users.find({ ishosted: true }).count();
      allData["totalNumberOfProperty"] = totalNumberOfProperty;
      allData["totalNumberOfHost"] = totalNumberOfHost;
      const currentDate = new Date();
      const sevenDaysAgo = new Date(
        currentDate.getTime() - 7 * 24 * 60 * 60 * 1000
      );
      const moneyGeneratedPerWeek = await BookingCollection.aggregate([
        { $match: { createdAt: { $gte: sevenDaysAgo, $lte: currentDate } } },
        { $group: { _id: 0, weeklyAmount: { $sum: "$totalprice" } } },
        { $project: { weeklyAmount: 1, _id: 0 } },
      ]);
      allData["moneyGeneratedPerWeek"] = moneyGeneratedPerWeek[0].weeklyAmount
      res.status(200).json(allData);
    } catch (err) {
      console.log(err)
      res.status(500).send(err);
    }
  },
};
