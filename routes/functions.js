var ExifImage = require('exif').ExifImage;
var helper = require('./functions');

module.exports.ConvertDMSToDD = function(degrees, minutes, seconds, direction) {
    var dd = degrees + minutes/60 + seconds/(60*60);
    dd = parseFloat(dd);
    if (direction == "S" || direction == "W") {
        dd = dd * -1;
    } // Don't do anything for N or E
    return dd/10;
}

module.exports.getLocationFromEXIFData = function(image, callback) {
//   try {
      new ExifImage({ image :  __dirname + '/../public/uploads/' + image }, function (error, exifData) {
          if (error)
              //console.log('Error: '+error.message);
              callback(error, null);
          else {
            exifData = exifData.gps;
            var gpsLon = exifData.GPSLongitude[0] + "°" + exifData.GPSLongitude[1] + "'" + exifData.GPSLongitude[2] + "\"" + " " + exifData.GPSLongitudeRef; 
            var gpsLat = exifData.GPSLatitude[0] + "°" + exifData.GPSLatitude[1] + "'" + exifData.GPSLatitude[2] + "\"" + " " + exifData.GPSLatitudeRef; 
            var input = gpsLat + " " + gpsLon;
            var parts = input.split(/[^\d\w]+/);
            var lat = helper.ConvertDMSToDD(parts[0], parts[1], Math.round(parts[2]), parts[4]);
            var lng = helper.ConvertDMSToDD(parts[5], parts[6], Math.round(parts[7]), parts[9]);
            
            lat = Math.round(lat * 1000000) / 1000000;
            lng = Math.round(lng * 1000000) / 1000000;
            callback(null, {lat:lat, lng:lng});
            // geocoder.reverse({lat:lat, lon:lng}, function(err, res) {
            //     if(err) callback(err);
            //     callback(null, res);
            // });
          }
      });
//   } catch (error) {
//       console.log('Error: ' + error.message);
//   }
}