const users = require("../model/userCollection");
const admin = require("../model/adminCollection");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  login: async (req, res) => {
    console.log(req.body);

    try {
      let result = await admin.findOne(req.body);
      console.log("called");

      console.log(result);
      if (result) {
        let accessToken = jwt.sign(
          { username: result.username },
          process.env.ACCESS_TOKEN_SECRET_ADMIN,
          { expiresIn: "2d" }
        );
        await admin.updateOne({ _id: result._id }, { $set: { accessToken } });
        console.log(accessToken);
        res.cookie("ANT", accessToken, {
          httpOnly: true,
          secure: false,
          sameSite: "none",
          maxAge: 2 * 24 * 60 * 60 * 1000,
          domain: "localhost",
          path: "/admin",
        });
        res.sendStatus(200);
        return;
      }
    } catch (err) {
      console.log(err);
      res.sendStatus(403);
    }
  },
  userlist: async (req, res) => {
    try {
      console.log(req.query);
      let limit = parseInt(req.query.limit);
      let page = parseInt(req.query.page);
      let skip = page * limit;
      let count = await users.count();
      console.log(count);
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
      console.log(list);

      res.status(200).json({ list: list, count: count });
    } catch (err) {
      res.sendStatus(403);
    }
  },
  blockunblock: async (req, res) => {
    try {
      console.log(req.params);

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
            phonenumber:1,
            hostdetails:{$arrayElemAt:['$hostdetails',0]}
          }
        }, {
          $project: {
            email: 1,
            phonenumber: 1,
            DateOfBirth: '$hostdetails.DateOfBirth',
            FullName: '$hostdetails.FullName',
            AadharNumber: '$hostdetails.AadharNumber',
            RentalLicensePermitid: '$hostdetails.RentalLicensePermit',
            PanCard:'$hostdetails.PanCard'
          }
        }
      ]);
      console.log(result);
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
    }
  },
  approvehost: async (req, res) => {
    try {
      await users.updateOne({ _id: req.params.id }, { ishosted: true });
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
    }
  },
};
