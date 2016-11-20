var express = require('express');
var router = express.Router();
var multer = require('multer');
var ExifImage = require('exif').ExifImage;
var helper = require('./functions');
var gcloud = require('gcloud');
var path = require("path");
var pricing = require('../pricing/pricing');
var title_func = require('./title');
var categorize_func = require('./categorize');

var vision = gcloud.vision({
    projectId: 'simplykijiji-150019',
    keyFilename: path.resolve(__dirname, './keyfile.json')
});

var filename = "";
var UPLOAD_DIR = __dirname + "/../public/uploads/";

var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, UPLOAD_DIR)
    },
    filename: function(req, file, callback) {
        filename = file.originalname;
        callback(null, file.originalname);
    }
});

var upload = multer({
    dest: UPLOAD_DIR,
    limits: { fileSize: 3000000, files: 1 },
    storage: storage
});

router.post('/image/upload', upload.any(), function(req, res, next) {
    helper.getLocationFromEXIFData(filename, function(err, location) {
        if (err) {
            console.log(err);
            location = null;
        }
        vision.detectLabels(UPLOAD_DIR + filename, function(err, labels, apiResponse) {
            if (err) console.log(err);
            var price_range = pricing.keysToPrices(labels);
            title_func.titleAndDescriptionItem(labels, function(err, result) {
                if (err) console.log(err);
                categorize_func.categorizeItem(labels, function(err, labelscat) {
                    if (err) console.log(err);
                    var response = {
                        title: result.title,
                        filepath: "/uploads/" + filename,
                        description: result.description,
                        catagories: labelscat,
                        price_range,
                        location,
                    }
                    console.log(response);
                    res.send(response);
                })
            });
        });
    });
});

router.get('/file', function(req, res, next) {
    var r = pricing.keysToPrices(["toyota", "car"]);
    res.send(r);
});

module.exports = router;
