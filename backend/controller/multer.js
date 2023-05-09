const multer = require('multer')
const multerS3 = require('multer-s3')
const { S3Client } = require('@aws-sdk/client-s3')
require('dotenv').config()
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'public/images')
//     },
//     filename: function (req, file, cb) {
//         const fileName = `${Date.now()}-${file.originalname}`
//       cb(null, fileName)
//     }
//   });
  
// const upload = multer({ storage: storage });
  
// module.exports=upload
const s3 = new S3Client({
  region: 'ap-south-1',
  credentials: {
    accessKeyId: process.env.Access_key_id,
    secretAccessKey:process.env.Secret_Access_Key
  }
 
})

const uploads3 = multer({
  fileFilter: function(req, file, cb) {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed!'));
    }
    cb(null, true);
  },
  storage: multerS3({
    s3: s3,
    bucket: 'hotelova',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`)
    }
  })
})

module.exports={uploads3,s3}