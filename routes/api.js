var express = require('express');
var router = express.Router();
var multer = require('multer');
var ExifImage = require('exif').ExifImage;
var helper = require('./functions');

var filename = "";
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    console.log("dir name is: ", __dirname);
    callback(null, __dirname + '/../public/uploads/')
  },
  filename: function (req, file, callback) {
    //callback(null, Date.now() + '.png') //Appending .png
    filename = file.originalname + '.png';
    callback(null, file.originalname + '.png');
  }
});

var upload = multer({
  dest: __dirname + '../public/uploads/',
  limits: {fileSize: 2000000, files:1},
  storage: storage
});

router.get('/', function(req, res, next) {
  res.send('index.html');
});

router.post('/image/upload', upload.any(), function (req, res, next) {
  helper.getLocationFromEXIFData(filename);
  var fakeResponse = {
    title: 'PS4',
    description: 'Sony Console',
    catagories : [ 'Electronics', 'Gaming' ],
    price_range: [200, 400],
    location: 'Toronto, ON'
  }

  res.send(fakeResponse);
});

module.exports = router;
