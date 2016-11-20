var express = require('express');
var router = express.Router();
var multer = require('multer');
var ExifImage = require('exif').ExifImage;
var helper = require('./functions');
var gcloud = require('gcloud');
var path = require("path");

var vision = gcloud.vision({
  projectId: 'simplykijiji-150019',
  keyFilename: path.resolve(__dirname, './keyfile.json')
});

var filename = "";
var UPLOAD_DIR = __dirname + "/../public/uploads/";

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, __dirname + UPLOAD_DIR)
  },
  filename: function (req, file, callback) {
    filename = file.originalname;
    callback(null, file.originalname);
  }
});

var upload = multer({
  dest: __dirname + '/../public/uploads/',
  limits: { fileSize: 3000000, files:1 },
  storage: storage
});

router.post('/image/upload', upload.any(), function (req, res, next) {
      helper.getLocationFromEXIFData(filename, function(err, location) {
        if (err) {
          console.log(err);
          location = null;
        }
        vision.detectLabels(UPLOAD_DIR + filename, function(err, labels, apiResponse) {
          if (err) console.log(err);
          var response = {
            title: 'TITLE',
            description: 'DDEESSCCRRIIPPTTIOONNN',
            catagories : labels,
            price_range: [200, 400],
            location,
          }
          console.log(response);
          res.send(response);
        });
  });
});

module.exports = router;
