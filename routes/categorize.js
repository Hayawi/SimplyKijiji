var Fuse = require('fuse.js');

var kijijiCategories = ["animal, pet services", 
									"birds for rehoming",
									"cats, kittens for rehoming",
									"dogs, puppies for rehoming",
									"equestrian, livestock accessories",
									"fish for rehoming",
									"horses, ponies for rehoming",
									"livestock",
									"lost & found",
									"accessories",
									"reptiles & amphibians for rehoming",
									"small animals for rehoming",
									"other pets for rehoming",
									"furniture",
									"SUV",
									"Trucks",
									"Vans",
									"Motorcycles",
									"RV"];

function categorizeItem(labels, callback){
		var searchCats = new Fuse(kijijiCategories);
		
		for (var i = 0; i < labels.length; i++){
			var category = kijijiCategories[searchCats.search(labels[i])];
			if (category != undefined)
				console.log(category);
		}
}

categorizeItem(["vertebrate"], console.log);