const user = require("../model/userCollection");
const jwt_decode = require("jwt-decode");
const jwt = require('jsonwebtoken');
const hostCollection = require("../model/hostCollection");
require('dotenv').config()

module.exports = {
  otplogin: async (req, res) => {
        try {
            var decoded = jwt_decode(req.body.accessToken);
            console.log(decoded);
        
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
                    refreshToken:'',
                    ishosted: false,
                  blocked: false,
                  hostingApproval:false
                  };
                result = await user.create(data);
                console.log(result);
                
            }
          
            let accessToken=jwt.sign({_id:result._id},process.env.ACCESS_TOKEN_SECRET,{expiresIn:'2d'})
             
            await user.updateOne({ _id: result._id }, { $set: { accessToken } })

            res.cookie('Ent',accessToken,{httpOnly:true,secure:true,sameSite:'none',maxAge:2*24*60*60*1000, domain: "localhost",path:'/users'})
               
            res.status(200).json({_id:result._id,phonenumber:result.phonenumber,email:result.email,accessToken:accessToken})
        } catch (error) {
          console.log(error)
          res.sendStatus(400)
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
          res.sendStatus(400)
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
        hostingApproval:false
      };
      result = await user.create(data);
        }
        if (result.blocked==true) {
          res.sendStatus(403)
          return
        }
        let accessToken=jwt.sign({_id:result._id},process.env.ACCESS_TOKEN_SECRET,{expiresIn:'2d'})
             
      
        await user.updateOne({ _id: result._id }, { $set: { accessToken } })
        res.cookie('Ent',accessToken,{httpOnly:true,secure:true,sameSite:true,maxAge:2*24*60*60*1000}) 
        res.status(200).json({_id:result._id,phonenumber:result.phonenumber,email:result.email,accessToken:accessToken})

        
      } catch (error) {
          res.sendStatus(400)
    }
  },
  userlogout: async(req, res) => {
    try {
      let cookies = req.cookies
      let accessToken = cookies.Ent
      await user.updateOne({ accessToken }, { $set: { accessToken: '' } })
      res.clearCookie('Ent', { httpOnly: true })
      res.sendStatus(200)
      
    } catch (err) {
      res.sendStatus(403)
    }
  },
  checkisblocked: async(req, res) => {
    let check = await user.findOne(req.body)
    if (!check) {
      res.sendStatus(200)
      return
    }
    
    if (check.blocked == true) {
      res.sendStatus(403)
      return
    }
    res.sendStatus(200)
  },
  checkhoststatus: async(req, res) => {
    try {
      console.log(req.body);
      console.log('reached');
      
      let result = await user.findOne({ _id: req.body.id })
      if (!result) {
        throw({message:'no user'})
      }
      res.status(200).json(result)
    } catch (err) {
      res.sendStatus(404)
   }
  },
   
  hostverify: async (req, res) => {
    try {
      console.log(req.body);

      await user.updateOne({ _id: req.body.id }, { hostingApproval: true })
      
      res.sendStatus(200)
      
    } catch (err) {
      console.log(err)

    }
  },

  hostDetails: async(req, res) => {
    await hostCollection.create(req.body)
    res.sendStatus(200)
  }
};
