const express = require("express");
const {
  userlist,
  blockunblock,
  login,
  hostRequestuser,
  approvehost,
  getBookings,
  getDashboardData,
} = require("../controller/adminhelper");
const {
  getAllproperty,
  removeProperty,
  addRoomType,
  getRoomType,
  removeRoomType,
  editRoomType,
  addAmenties,
  getAmenities,
  removeAmenities,
  editAmenties,
} = require("../controller/property");
const router = express.Router();
const {uploads3} = require("../controller/multer");
const { verifyJWTAdmin } = require("../controller/jwt/jwtVerifyAdmin");
const { Cancelbooking } = require("../controller/CheckoutHelper");
const app = express();

router.post("/login", login);

app.use(verifyJWTAdmin);

router.get("/getAllUsers", userlist);

router.patch("/blockOrUnblock/:id", blockunblock);

router.get("/getAllHostRequest", hostRequestuser);

router.patch("/approveHost/:id", approvehost);

router.get("/getAllproperty", getAllproperty);

router.delete("/removeProperty/:id", removeProperty);

router.post("/addRoomType", uploads3.single("images"), addRoomType);

router.get("/getRoomType", getRoomType);

router.delete("/removeRoomType/:id", removeRoomType);

router.put("/editRoomType", uploads3.single("images"), editRoomType);

router.post("/addAmenities", uploads3.single("images"), addAmenties);

router.get("/getAllAmenities", getAmenities);

router.delete("/removeAmenities/:id", removeAmenities);

router.put("/editAminities", uploads3.single("images"), editAmenties);

router.get("/getAllBookings", getBookings);

router.post("/cancelBooking/:orderid", Cancelbooking);

router.get("/getAllDashboard", getDashboardData);

module.exports = router;
