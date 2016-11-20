var faker = require('faker');
var JSON = require('JSON');
var jsonfile = require('jsonfile');

var transactions = [];

for (i = 0; i < 100; i++) {
  var item = {
    product: faker.commerce.product(),
    department: faker.commerce.department(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    description: faker.commerce.productAdjective()
  };
  transactions[i] = item;
}

var jsonTrxns = JSON.stringify(transactions);
