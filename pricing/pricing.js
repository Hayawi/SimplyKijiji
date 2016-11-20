// var JSON = require('JSON');
// var jsonfile = require('jsonfile');
const math = require('mathjs');
const fs = require('fs');
const path = require('path');
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
      "category",
      "description"
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
  //console.log(matches);
  var priceArr = getPriceArray(matches);
  return getPriceRange(priceArr);
}

console.log(keysToPrices(["toyota"]));

