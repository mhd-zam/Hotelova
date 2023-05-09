const user = require("../model/userCollection");
const jwt_decode = require("jwt-decode");
const jwt = require("jsonwebtoken");
const hostCollection = require("../model/hostCollection");
const wishlistCollection = require("../model/wishlistCollection");
const { default: mongoose } = require("mongoose");
const userCollection = require("../model/userCollection");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

module.exports = {
  otplogin: async (req, res) => {
    try {
      var decoded = jwt_decode(req.body.accessToken);

      let result = await user
        .findOne({
          $or: [
            { otpAuth_id: decoded.user_id },
            { phonenumber: decoded.phone_number },
          ],
        })
        .exec();

      if (!result) {
        let data = {
          phonenumber: decoded.phone_number,
          otpAuth_id: decoded.user_id,
          username: "",
          email: "",
          address: {
            street: "",
            city: "",
            state: "",
            pincode: "",
            country: "",
            district: "",
          },
          refreshToken: "",
          ishosted: false,
          blocked: false,
          hostingApproval: false,
        };
        result = await user.create(data);
      }

      let accessToken = jwt.sign(
        { _id: result._id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "2d" }
      );

      await user.updateOne({ _id: result._id }, { $set: { accessToken } });

      res.cookie("Ent", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 2 * 24 * 60 * 60 * 1000,
        domain: "localhost",
        path: "/users",
      });

      res.status(200).json({
        _id: result._id,
        phonenumber: result.phonenumber,
        email: result.email,
        username: result.username,
        Wallet:result.Wallet
      });
    } catch (error) {
      res.sendStatus(400);
    }
  },

  enteruserdetails: async (req, res) => {
    try {
      let name = Object.keys(req.body);
      if (name[2] == "phonenumber") {
        req.body.phonenumber = "+91" + req.body.phonenumber;
      }
      let result = await user.findOne({ [name[2]]: req.body[name[2]] });
      if (result) {
        res.sendStatus(406);
        return;
      }
      await user.updateOne({ _id: req.body._id }, { $set: req.body });
      res.sendStatus(200);
    } catch (error) {
      res.sendStatus(400);
    }
  },

  gmailAuth: async (req, res) => {
    try {
      let decode = jwt_decode(req.body.data);
      let result = await user.findOne({ email: decode.email });

      if (!result) {
        let data = {
          phonenumber: "",
          otpAuth_id: "",
          username: decode.name,
          email: decode.email,
          address: {
            street: "",
            city: "",
            state: "",
            pincode: "",
            country: "",
            district: "",
          },
          ishosted: false,
          blocked: false,
          hostingApproval: false,
        };
        result = await user.create(data);
      }
      if (result.blocked == true) {
        res.sendStatus(403);
        return;
      }
      let accessToken = jwt.sign(
        { _id: result._id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "2d" }
      );

      await user.updateOne({ _id: result._id }, { $set: { accessToken } });
      res.cookie("Ent", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: true,
        maxAge: 2 * 24 * 60 * 60 * 1000,
        domain: "localhost:3000",
        path: "/users",
      });
      res.status(200).json({
        _id: result._id,
        phonenumber: result.phonenumber,
        email: result.email,
        username: result.username,
      });
    } catch (error) {
      res.sendStatus(400);
    }
  },
  userlogout: async (req, res) => {
    try {
      let cookies = req.cookies;
      let accessToken = cookies.Ent;
      await user.updateOne({ accessToken }, { $set: { accessToken: "" } });
      res.clearCookie("Ent", { httpOnly: true });
      res.sendStatus(200);
    } catch (err) {
      res.sendStatus(403);
    }
  },
  checkisblocked: async (req, res) => {
    let check = await user.findOne(req.body);
    if (!check) {
      res.sendStatus(200);
      return;
    }

    if (check.blocked == true) {
      res.sendStatus(403);
      return;
    }
    res.sendStatus(200);
  },
  checkhoststatus: async (req, res) => {
    try {
      let result = await user.findOne({ _id: req.body.id });
      if (!result) {
        throw { message: "no user" };
      }
      res.status(200).json(result);
    } catch (err) {
      res.sendStatus(404);
    }
  },

  hostverify: async (req, res) => {
    try {
      await user.updateOne({ _id: req.body.id }, { hostingApproval: true });

      res.sendStatus(200);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  hostDetails: async (req, res) => {
    try {
      await hostCollection.create(req.body);
      res.sendStatus(200);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  managewishlist: async (req, res) => {
    try {
      await wishlistCollection.updateOne(
        { userid: req.body.userid },
        { $addToSet: { wishlist: req.body.item } },
        { upsert: true }
      );
      res.status(200).send("ok");
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
  removeFromWishlist: async (req, res) => {
    try {
      await wishlistCollection.updateOne(
        { userid: req.params.userid },
        { $pull: { wishlist: req.params.wishlistid } }
      );
      res.status(200).send("ok");
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getWishlist: async (req, res) => {
    try {
      let result = await wishlistCollection.aggregate([
        { $match: { userid: req.params.userid } },
        { $unwind: "$wishlist" },
        {
          $lookup: {
            from: "propertymodels",
            let: { wishlistId: { $toObjectId: "$wishlist" } },
            pipeline: [
              { $match: { $expr: { $eq: ["$_id", "$$wishlistId"] } } },
            ],
            as: "property",
          },
        },
        {
          $addFields: {
            property: { $arrayElemAt: ["$property", 0] },
          }
        }
      ]);
      let whishlistitem = result.map((item) => item.property);

      res.status(200).send(whishlistitem);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
  getWallet: async(req, res) => {
    try {
      let wallet = await userCollection.findOne({ _id: req.params.userid }, {_id:0,Wallet: 1 })
      res.status(200).json(wallet)
    } catch (err) {
      res.status(500).send(err)
    }
  }
};
