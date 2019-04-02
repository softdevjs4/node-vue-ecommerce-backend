const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const config = require('config');

cloudinary.config({
  cloud_name: config.get('cloudinary.cloud_name'),
  api_key: config.get('cloudinary.api_key'),
  api_secret: config.get('cloudinary.api_secret')
});
const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "mfr",
  allowedFormats: ["jpg", "png"],
  transformation: [{ width: 500, height: 500, crop: "limit" }]
});
const multerParser = multer({ storage: storage });

// Delete image from server
const deleteServerImage = (imageId)=>{
  cloudinary.v2.uploader.destroy(imageId, function(error,result) {
    if(error) return error;
    return true;
  });
}

exports.multerParser = multerParser;
exports.deleteServerImage = deleteServerImage;

