// var JSON = require('JSON');
// var jsonfile = require('jsonfile');
const math = require('mathjs');
const fs = require('fs');
const path = require('path');
const fuse = require('fuse.js');

const json2 = {
"transactions":[
    {"category": "car", 
     "title": "2010 Toyota RAV4, AWD, 2.5 Eng. Extremely Good Condition",
     "price": 12900.00,
     "description": "One owner 2010 Toyota RAV4, fuel efficient 2.5 4cyls engine. AWD, All power group, AC. Extremely clean interior & exterior. No rust or other damages. Free of accidents & paint works. All key & books. Comes with Safety & E-test. Please email me for more information."},
    {"category": "car", 
     "title": "2008 Pontiac G5 etest safety must sell!",
     "price": 2950.00,
     "description": "I'm selling my 2008 Pontiac G5. Its in great condition inside and out. Runs very smooth. Power window, power locks, cruise control, CD player, 4 new tires! 175,000 km only. This car has a timing chain that never needs to be changed. Great commuter car that's cheap on gas. Selling emission tested and certified. Asking $2950 or best offer."}
]
}

//console.log(typeof json2);
 
/*
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
*/

function fuzzysearch(keys) {
  var options = {
    shouldSort: true,
    threshold: 0.5,
    location: 0,
    distance: 100,
    maxPatternLength: 52,
    keys: [
      "title",
      "category",
      "description"
  ] 
  };
  var fuzzy = new Fuse(json2["transactions"], options);
  var results = [];
  var keysLen = keys.length;
  for (var i = 0; i < keysLen; i++) {  
    var matchingEntries = fuzzy.search(keys[i]);
    results.concat(matchingEntries);
  }
  return results; //outputs array of all postings matching any of the keywords.
}

function getPriceArray(trxnArray) {   //takes an array of posting
  //var transations = trxnJson["transactions"];
  var prices = [];
  var arrayLen = trxnArray.length;
  for (var i = 0; i < arrayLen; i++) {
    var price = trxnArray[i]["price"];
    prices[i] = price;
  }
  return prices;  //returns array of doubles representing price
}

function getPriceRange(priceArray) {
  var mean = math.mean(priceArray);
  var std = math.std(priceArray);
  var priceRange = [mean - std, mean + std];
  return priceRange;
}

function keysToPrices(keys) {
  var matches = fuzzysearch(keys);
  console.log(matches);
  var priceArr = getPriceArray(matches);
  return getPriceRange(priceArr);
}

console.log(keysToPrices["toyota"]);
