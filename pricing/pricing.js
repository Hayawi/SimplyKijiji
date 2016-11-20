const math = require('mathjs');
const Fuse = require('fuse.js');

const largeJson = require('./dummydata.json');


function fuzzysearch(keys) {
  var options = {
    shouldSort: true,
    threshold: 0.5,
    location: 0,
    distance: 100,
    maxPatternLength: 52,
    keys: [
      "title",
      "category"
  ] 
  };
  var fuzzy = new Fuse(largeJson["transactions"], options);
  var results = [];
  var keysLen = keys.length;
  for (var i = 0; i < keysLen; i++) {  
    var matchingEntries = fuzzy.search(keys[i]);
    //console.log(matchingEntries);
    results = results.concat(matchingEntries);
  }
  //console.log(results);
  return results; //outputs array of all postings matching any of the keywords.
}

function getPriceArray(trxnArray) {   //takes an array of posting
  //var transations = trxnJson["transactions"];
  var prices = new Array;
  var arrayLen = trxnArray.length;
  console.log(trxnArray);
  for (var i = 0; i < arrayLen; i++) {
    var price = trxnArray[i]["price"];
    prices.push(price);
  }
  return prices;  //returns array of doubles representing price
}

function getPriceRange(priceArray) {
  var mean = math.mean(priceArray);
  var std = math.std(priceArray);
  var lower = mean - 0.5 * std;
  if(lower <= 0) {
    lower = math.min(priceArray);
  }
  var upper = mean + 0.5 * std;
  var priceRange = [Math.round(lower * 100)/100, Math.round(upper * 100)/100];
  return priceRange;
}

module.exports.keysToPrices = function(keys) {
  var matches = fuzzysearch(keys);
  var priceArr = getPriceArray(matches);
  var result = getPriceRange(priceArr);
  return result;
  //callback(null, result);
}

