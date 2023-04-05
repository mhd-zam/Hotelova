const express = require('express')
const router = express.Router()
const upload = require('../controller/multer')
require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_KEY)


const { otplogin, enteruserdetails, gmailAuth, userlogout, checkisblocked, checkhoststatus, hostverify, hostDetails } = require('../controller/userhelper');
const { addproperty, getAllproperty, EditProperty, removeProperty, getAmenities, getRoomType } = require('../controller/property');
const { verifyJWT } = require('../controller/jwt/jwtVerify');

router.post('/otplogin', otplogin)

router.post('/userdetails', enteruserdetails)

router.post('/gmaillogin', gmailAuth)

router.post('/check', checkisblocked)

router.post('/logout', userlogout)

router.post('/addproperty', verifyJWT, upload.array('images'), addproperty)

router.post('/become-a-host', verifyJWT, hostverify)

router.post('/is-a-host', verifyJWT, checkhoststatus)

router.get('/viewAllProperty', getAllproperty)

router.put('/editProperty',verifyJWT, upload.array('images'),EditProperty)

router.delete('/removeProperty/:id', removeProperty)

router.post('/hostdetails', verifyJWT, hostDetails)

router.get('/getAllAmenities', getAmenities)

router.get('/getRoomType', getRoomType)


router.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'T-shirt',
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:4242/success',
      cancel_url: 'http://localhost:4242/cancel',
    })

    res.send({url:session.url})
  });

module.exports= router