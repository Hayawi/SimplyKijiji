var express = require('express');
var router = express.Router();
var multer = require('multer');
var ExifImage = require('exif').ExifImage;

var upload = multer({
  dest: __dirname + '../public/uploads/',
  limits: {fileSize: 2000000, files:1},
})

router.get('/', function(req, res, next) {
  res.send('._.');
});

router.get('/', function(req, res, next) {
  res.send('._.');
});

router.post('/image/upload', upload.any(), function (req, res, next) {
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
})

function getLocationFromEXIFData(image, callback) {
  try {
      new ExifImage({ image : 'myImage.jpg' }, function (error, exifData) {
          if (error)
              console.log('Error: '+error.message);
          else
              console.log(exifData); // Do something with your data!
      });
  } catch (error) {
      console.log('Error: ' + error.message);
  }
}

module.exports = router;
