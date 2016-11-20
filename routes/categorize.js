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
									'RV'];

function categorizeItem(labels, callback){
		var searchCats = new Fuse(kijijiCategories);
		var options = {
			 shouldSort: true,
			 threshold: 0.6,
			 location: 0,
			 distance: 100,
			 maxPatternLength: 32,
		};
		for (var i = 0; i < labels.length; i++){
			var category = searchCats.search(labels[i]);
			for (var j = 0; j < category.length; j++)
				console.log(kijijiCategories[category[j]]);
		}
}

categorizeItem(['rehoming'], console.log);