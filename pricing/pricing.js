var JSON = require('JSON');
var jsonfile = require('jsonfile');
var math = require('math');

function getPriceArray(trxnJson) {
  var transations = trxnJson["transactions"];
  var prices = [];
  var arrayLen = transactions.length;
  for (var i = 0; i < arrayLen; i++) {
    var price = transactions[i]["price"];
    prices[i] = price;
  }
  return prices;
}

function getPriceRange(priceArray) {
  mean = math.mean(priceArray);
  std = math.std(priceArray);
  priceRange = [mean - std; mean + std];
  return priceRange;
}
