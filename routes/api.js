var express = require('express');
var router = express.Router();
var multer = require('multer');
var ExifImage = require('exif').ExifImage;
var helper = require('./functions');
var gcloud = require('gcloud');
var path = require("path");
var pricing = require('../pricing/pricing');

var vision = gcloud.vision({
  projectId: 'simplykijiji-150019',
  keyFilename: path.resolve(__dirname, './keyfile.json')
});

var filename = "";
var UPLOAD_DIR = __dirname + "/../public/uploads/";

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, UPLOAD_DIR)
  },
  filename: function (req, file, callback) {
    filename = file.originalname;
    callback(null, file.originalname);
  }
});

var upload = multer({
  dest: UPLOAD_DIR,
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
            filepath: "/uploads/" + filename,
            description: 'Description',
            catagories : labels,
            price_range: [200, 400],
            location,
          }
          console.log(response);
          res.send(response);
        });
  });
});

router.get('/file', function(req, res, next) {
  pricing.getDummyData(function (err, data) {
      if(err) console.log(err);
      else {
        console.log(data)
        res.send(data);
      }
    });
});

module.exports = router;
