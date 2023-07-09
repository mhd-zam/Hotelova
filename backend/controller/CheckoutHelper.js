require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const propertyCollection = require("../model/propertyCollection");
const BookingCollection = require("../model/BookingCollection");
const mongoose = require("mongoose");
const getAllBookedDates = require("./Logic");
const userCollection = require("../model/userCollection");
const RoomCollection = require("../model/RoomCollection");

module.exports = {
  CreateCheckout: async (req, res) => {
    const {
      PropertyName,
      hostid,
      _id,
      Address,
      checkin,
      checkOut,
      userid,
      adult,
      Room,
      bookedRoom,
      children,
    } = req.body.property;
    const diff =
      (new Date(checkOut) - new Date(checkin)) / (1000 * 60 * 60 * 24);
    const { Price, Maxguest } = await propertyCollection.findOne({ _id: _id });
    const TotalAmount = Price * diff * Room;
    req.session.TotalAmount = TotalAmount;
    const TotalGuestAllowed = Maxguest * Room;
    const GuestInBooking = children + adult;

    try {
      if (GuestInBooking <= TotalGuestAllowed && Price) {
        const session = await stripe.checkout.sessions.create({
          shipping_options: [
            {
              shipping_rate_data: {
                type: "fixed_amount",
                fixed_amount: { amount: 0, currency: "INR" },
                display_name: "Free shipping",
              },
            },
            {
              shipping_rate_data: {
                type: "fixed_amount",
                fixed_amount: { amount: 1500, currency: "INR" },
                display_name: "Next day air",
              },
            },
          ],
          line_items: [
            {
              price_data: {
                currency: "INR",
                product_data: {
                  name: PropertyName,
                  description: Address,
                },
                unit_amount: TotalAmount * 100,
              },
              quantity: 1,
            },
          ],
          metadata: {
            Propertyid: _id,
            userid: userid,
            hostid,
            checkin,
            checkOut,
            adult,
            children,
            bookedRoom: bookedRoom.toString(),
          },
          mode: "payment",
          success_url: "http://hotelova.site/success",
          cancel_url: "http://hotelova.site/cancel",
        });
        req.session.verifyid = session.id;
        res.send({ url: session.url });
        return;
      }
    } catch (err) {
      res.send({ url: "http://hotelova.site/cancel" })
    }
  },

  PlaceOrder: async (req, res) => {
    const updatedSession = await stripe.checkout.sessions.retrieve(
      req.session.verifyid
    );
    const {
      Propertyid,
      adult,
      children,
      checkOut,
      checkin,
      hostid,
      userid,
      bookedRoom,
    } = updatedSession.metadata;

    const document = {
      propertyid: Propertyid,
      hostid,
      userid,
      guest: {
        childrens: parseInt(children),
        adults: parseInt(adult),
      },
      checkin: new Date(checkin),
      checkOut: new Date(checkOut),
      Paymentstatus: updatedSession.payment_status,
      totalprice: updatedSession.amount_total.toString().slice(0, -2),
      OrderStatus: "Booking pending",
    };
    let propID = new mongoose.Types.ObjectId(Propertyid);
    const queryProperty = await propertyCollection.findOne({ _id: propID });

    try {
      if (updatedSession.payment_status == "paid") {
        await BookingCollection.create(document);
        const unavailableDates = getAllBookedDates(checkin, checkOut);
        let result = await RoomCollection.updateMany(
          { _id: { $in: bookedRoom.split(",") } },
          { $addToSet: { DatesNotAvailable: { $each: unavailableDates } } }
        );
        res.status(200).send('success')
        return;
      }
      throw new Error('payment not success')
    } catch (err) {
      res.status(500).send(err);
    }
  },

  getOrders: async (req, res) => {
    try {
      let userID = new mongoose.Types.ObjectId(req.params.userid);
      let orders = await BookingCollection.aggregate([
        { $match: { userid: userID } },
        {
          $lookup: {
            from: "propertymodels",
            localField: "propertyid",
            foreignField: "_id",
            as: "Property",
          },
        },
        {
          $addFields: {
            Property: { $arrayElemAt: ["$Property", 0] },
          },
        },
        {
          $project: {
            guest: 1,
            paymentStatus: 1,
            OrderStatus: 1,
            checkin: 1,
            checkOut: 1,
            createdAt: 1,
            propertyName: "$Property.PropertyName",
            address: "$Property.Address",
            totalprice: 1,
            image: "$Property.images",
          },
        },
        {
          $addFields: {
            Guest: "$guest",
            TotalAmount: "$totalprice",
            Checkin: {
              $dateToString: { format: "%d-%m-%Y", date: "$checkin" },
            },
            Checkout: {
              $dateToString: { format: "%d-%m-%Y", date: "$checkOut" },
            },
            PropertyName: "$propertyName",
            PropertyAddress: "$address",
            Image: { $arrayElemAt: ["$image", 0] },
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
            Guest: 1,
            OrderStatus: 1,
            TotalAmount: 1,
            Checkin: 1,
            Checkout: 1,
            createdAt: 1,
            PropertyName: 1,
            PropertyAddress: 1,
            Image: 1,
            Action: 1,
          },
        },
        { $sort: { createdAt: -1 } },
      ]);

      res.status(200).json(orders);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getReservation: async (req, res) => {
    let hostID = new mongoose.Types.ObjectId(req.params.hostid);

    try {
      let reservation = await BookingCollection.aggregate([
        { $match: { hostid: hostID, OrderStatus: "Booking pending" } },
        {
          $lookup: {
            from: "usermodels",
            localField: "userid",
            foreignField: "_id",
            as: "userDetails",
          },
        },
        { $addFields: { userDetails: { $arrayElemAt: ["$userDetails", 0] } } },
        {
          $project: {
            guest: 1,
            totalprice: 1,
            Paymentstatus: 1,
            checkin: 1,
            checkOut: 1,
            OrderStatus: 1,
            createdAt: 1,
            GuestName: "$userDetails.username",
            GuestPhonenumber: "$userDetails.phonenumber",
            GuestEmail: "$userDetails.email",
            propertyid: 1,
          },
        },
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
            Checkin: {
              $dateToString: { format: "%d-%m-%Y", date: "$checkin" },
            },
            Checkout: {
              $dateToString: { format: "%d-%m-%Y", date: "$checkOut" },
            },
            Action: {
              $cond: {
                if: {
                  $eq: ["$OrderStatus", "Booking pending"],
                },
                then: true,
                else: false,
              },
            },
          },
        },
        {
          $project: {
            guest: 1,
            totalprice: 1,
            Paymentstatus: 1,
            Checkin: 1,
            Checkout: 1,
            createdAt: 1,
            GuestName: 1,
            GuestPhonenumber: 1,
            GuestEmail: 1,
            propertyid: 1,
            propertyName: "$propertyDetails.PropertyName",
            Action: 1,
          },
        },
        {
          $sort: { createdAt: -1 },
        },
      ]);

      res.status(200).json(reservation);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  approveReservation: async (req, res) => {
    let orderID = new mongoose.Types.ObjectId(req.params.orderid);

    try {
      await BookingCollection.updateOne(
        { _id: orderID },
        { $set: { OrderStatus: "Booking Confirmed" } }
      );

      res.status(200).send("ok");
    } catch (err) {
      res.status(500).send("internal error");
    }
  },
  Cancelbooking: async (req, res) => {
    let orderID = new mongoose.Types.ObjectId(req.params.orderid);
    try {
      let result = await BookingCollection.findOneAndUpdate(
        { _id: orderID },
        {
          $set: {
            OrderStatus: "Booking Cancelled",
          },
        }
      );
      const { userid, totalprice } = result;
      await userCollection.updateOne(
        { _id: userid },
        { $inc: { Wallet: totalprice } }
      );
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
};
