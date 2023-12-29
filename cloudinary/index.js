const cloudinary = require('cloudinary').v2;
const {CloudinaryStorage} = require('multer-storage-cloudinary');
const campground = require('../models/campground');

cloudinary.config({
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
  api_key:process.env.CLOUDINARY_KEY,
  api_secret:process.env.CLOUDINARY_SECRET
})

const storage = new CloudinaryStorage({
  cloudinary,
  params:{
    folder:'yelp-camp',
    allowedFormats:['jpeg', 'jpg', 'png', 'html']
  }
  
})

module.exports ={
  cloudinary,
  storage
}