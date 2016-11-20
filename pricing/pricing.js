// var JSON = require('JSON');
// var jsonfile = require('jsonfile');
var math = require('mathjs');
var fs = require('fs');
var path = require('path');
var pricing = require('./pricing.js');

module.exports.getDummyData = function(callback) {
  fs.readFile(path.join(__dirname, 'json10.json'), 'utf8', function(err, data){
    if(err) {
      callback(err, null);
    }
    else {
      // var arr = new Array;
      // for(var i = 0; i < data.length; i++) {
      //    arr.push(data.price);
      // }
      data = JSON.parse(data);
      //var arr = pricing.getPriceArray(data);
      callback(null, data);
    }
  });
}

 
module.exports.getPriceArray = function (data) {
  var prices = new Array;
  var arrayLen = data.transactions.length;
  for (var i = 0; i < arrayLen; i++) {
    var price = transactions[i]["price"];
    //prices[i] = price;
    prices.push(price);
  }
  return prices;
  // var arr = new Array;
  // for(var i = 0; i < data.transactions.length; i++) {
  //    arr.push(data.transactions);
  // }
  // return data;
}

// function getPriceRange(priceArray) {
//   mean = math.mean(priceArray);
//   std = math.std(priceArray);
//   priceRange = [mean - std; mean + std];
//   return priceRange;
// }
