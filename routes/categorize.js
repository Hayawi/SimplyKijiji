var Fuse = require('fuse.js');

var kijijiCategories = ['animal, pet services',
	'birds for rehoming',
	'cats, kittens for rehoming',
	'dogs, puppies for rehoming',
	'equestrian, livestock accessories',
	'fish for rehoming',
	'horses, ponies for rehoming',
	'livestock',
	'lost & found',
	'accessories',
	'reptiles & amphibians for rehoming',
	'small animals for rehoming',
	'other pets for rehoming',
	'furniture',
	'SUV',
	'Trucks',
	'Vans',
	'Motorcycles',
	'RV',
	'used cars & trucks',
	'cars',
	'new cars & trucks',
	'classic cars',
	'auto parts, tires',
	'automotive services',
	'ATVs, snowmobiles',
	'boats, watercraft',
	'RVs, campers, trailers',
	'heavy equipment',
	'computers',
	'computer accessories',
	'electronics'
];

module.exports.categorizeItem = function (labels, callback) {
	var options = {
		shouldSort: true,
		threshold: 0.3,
		location: 0,
		distance: 100,
		maxPatternLength: 32,
	};
	var searchCats = new Fuse(kijijiCategories, options);

	var cat_result = new Array;
	for (var i = 0; i < labels.length; i++) {
		var category = searchCats.search(labels[i]);

		for (var j = 0; j < category.length; j++)
			cat_result.push(kijijiCategories[category[j]]);
	}
	callback(null, cat_result);

}