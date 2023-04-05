const express = require('express')
const { userlist, blockunblock, login, hostRequestuser, approvehost } = require('../controller/adminhelper')
const { getAllproperty, removeProperty, addRoomType, getRoomType, removeRoomType, editRoomType, addAmenties, getAmenities, removeAmenities, editAmenties } = require('../controller/property')
const router = express.Router()
const upload = require('../controller/multer')
const { verifyJWTAdmin } = require('../controller/jwt/jwtVerifyAdmin')


router.post('/login',login)

router.get('/getAllUsers',userlist)

router.patch('/blockOrUnblock/:id',blockunblock)

router.get('/getAllHostRequest', hostRequestuser)

router.patch('/approveHost/:id', approvehost)

router.get('/getAllproperty', getAllproperty)

router.delete('/removeProperty/:id', removeProperty)

router.post('/addRoomType', upload.single('images'), addRoomType)

router.get('/getRoomType', getRoomType)

router.delete('/removeRoomType/:id',removeRoomType)

router.put('/editRoomType', upload.single('images'), editRoomType)
    
router.post('/addAmenities', upload.single('images'),addAmenties)
    
router.get('/getAllAmenities', getAmenities)

router.delete('/removeAmenities/:id', removeAmenities)

router.put('/editAminities', upload.single('images'),editAmenties)
module.exports=router