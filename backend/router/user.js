const express = require("express");
const router = express.Router();
const upload = require("../controller/multer");
require("dotenv").config();

const {
  otplogin,
  enteruserdetails,
  gmailAuth,
  userlogout,
  checkisblocked,
  checkhoststatus,
  hostverify,
  hostDetails,
  managewishlist,
  removeFromWishlist,
  getWishlist,
  getWallet,
} = require("../controller/userhelper");
const {
  addproperty,
  getAllproperty,
  EditProperty,
  removeProperty,
  getAmenities,
  getRoomType,
  searchProperty,
} = require("../controller/property");
const { verifyJWT } = require("../controller/jwt/jwtVerify");
const {
  CreateCheckout,
  PlaceOrder,
  getOrders,
  Cancelbooking,
  getReservation,
  approveReservation,
} = require("../controller/CheckoutHelper");
const {
  addConversation,
  getAllConversation,
  addMessages,
  getMessages,
} = require("../controller/Chathelper");

router.post("/otplogin", otplogin);

router.post("/userdetails", enteruserdetails);

router.post("/gmaillogin", gmailAuth);

router.post("/check", checkisblocked);

router.post("/logout", userlogout);

router.post("/addproperty", verifyJWT, upload.array("images"), addproperty);

router.post("/become-a-host", verifyJWT, hostverify);

router.post("/is-a-host", verifyJWT, checkhoststatus);

router.get("/viewAllProperty", getAllproperty);

router.put("/editProperty", verifyJWT, upload.array("images"), EditProperty);

router.delete("/removeProperty/:id", removeProperty);

router.post("/hostdetails", verifyJWT, hostDetails);

router.get("/getAllAmenities", getAmenities);

router.get("/getRoomType", getRoomType);

router.post("/create-checkout-session", CreateCheckout);

router.post("/placeorder", PlaceOrder);

router.get("/viewOrders/:userid", getOrders);

router.patch("/Cancelbooking/:orderid", Cancelbooking);

router.get("/viewReservation/:hostid", getReservation);

router.post("/ApproveReservation/:orderid", approveReservation);

router.post("/RejectReservation/:orderid", Cancelbooking);

router.get("/searchProperty", searchProperty);

router.post("/addconversation", addConversation);

router.get("/getConversation/:userid", getAllConversation);

router.post("/addmessages", addMessages);

router.get("/getMessages/:conversationid", getMessages);

router.post("/addtowishlist", managewishlist);

router.post("/removeWishlist/:userid/:wishlistid", removeFromWishlist);

router.get("/getWishlist/:userid", getWishlist);

router.get("/getWallet/:userid", getWallet)

router.get('/getPropertyType',getRoomType)

module.exports = router;
