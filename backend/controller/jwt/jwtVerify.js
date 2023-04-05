const jwt = require('jsonwebtoken')
const user = require("../../model/userCollection");
require('dotenv').config();

const  verifyJWT = async(req, res, next) => {
  
    const auth = req.cookies;
    console.log(auth)
    console.log('reached')
    if (!auth.Ent) {
        return   res.sendStatus(401)
    } 
    const token = auth.Ent
    let result = await user.findOne({ accessToken: token }) 
    if (!result) {
        res.clearCookie('Ent', { httpOnly: true })
        return   res.sendStatus(401)
    }
    console.log(token);
    jwt.verify(
        token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                console.log(err);
                
                return res.sendStatus(403)
            }
            req.user = decoded.username;
            next()
        }
    )
   
}

module.exports={verifyJWT}