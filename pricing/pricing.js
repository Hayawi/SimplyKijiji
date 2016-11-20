// var JSON = require('JSON');
// var jsonfile = require('jsonfile');
var math = require('mathjs');
var fs = require('fs');
var path = require('path');

module.exports.getDummyData = function(callback) {
  fs.readFile(path.join(__dirname, 'json10.json'), 'utf8', function(err, data){
    if(err) {
      callback(err, null);
    }
    else {
      callback(null, data);
    }
  });
}

 
// function getPriceArray(trxnJson) {
//   var transations = trxnJson["transactions"];
//   var prices = [];
//   var arrayLen = transactions.length;
//   for (var i = 0; i < arrayLen; i++) {
//     var price = transactions[i]["price"];
//     prices[i] = price;
//   }
//   return prices;
// }

// function getPriceRange(priceArray) {
//   mean = math.mean(priceArray);
//   std = math.std(priceArray);
//   priceRange = [mean - std; mean + std];
//   return priceRange;
// }
