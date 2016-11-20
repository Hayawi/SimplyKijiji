var Fuse = require('fuse.js');
var Algorithmia = require('Algorithmia');

var kijijiPostings = [
		{
			title: 'Brand New Samsung Galaxy S7 / Edge Factory Unlocked',
			description: 'Available online or pick up in store! Description Item: Samsung Galaxy S7 -- $724 Unlocked Available in Black Gold and Silver 32GB memory Item: Samsung Galaxy S7 Edge -- $849 Unlocked Available in Blue Coral *** Black Gold and Silver 32GB memory Frequencies supported GSM/EDGE Bands:850/900/1800/1900MHz HSPA+/'
		},
		{
			title: 'Apple iphone 5C Blue 8G Telus/ Koodo $140 New(9/10)',
			description: 'Apple iphone 5c blue 8G On Sale $140 9/10 new Telus/Koodo/Public Mobile Network New LCD, back cover '
		},
		{
			title : 'NEW UNLOCKED iPhone 6 - perfect condition, look at photos',
			description : '- new iPhone 6 - space grey - 16G - unlocked - purchased in August - perfect condition on sides, corners and back - a few scratches on the front ( please look at photos :) ), scratches look much'
		},
		{
			title : 'Unlocked Google LG Nexus 4 LNIB 9,5/10 condition',
			description : 'LG Google Nexus 4 Unlocked. 9,5/10 contion. Like new not a single scratch, barely used. In box and with all accessories+bonus protective case. Original owner 16G Black Light sensor, Proximity sensor'
		},
		{
			title : 'Black iPhone 4 Like New 16 Gb, Rogers Chatr',
			description : 'CALL 647-247-7403 Black iPhone 4 Like New 16Gb, Rogers Chatr. Original Box and Accessories. Camera Type:Cameraphone Sensor Resolution: Megapixels LCD Size: Media Type:Built-in flash memory Call 647 247 7403'
		},
		{
			title : 'UP FOR SALE: Oneplus 2 (64GB) Sandstone Black - Factory unlocked',
			description : 'For sale: Oneplus 2/Oneplus Two/Opo 2/Opo Two (64GB) Smartphone. Brand new in box and sealed in plastic wrap packaging (unopened). Bought it 4 weeks ago from Oneplus website. Comes with 1-year'
		},
		{
			title : '64gb Black Oneplus One. Unlocked.',
			description : 'Selling an unlocked 64gb one plus one in black sandstone. Dent in corner as shown in picture. Price is firm. Meet at Bay and Bloor. (55 Bloor Street West)'
		},
		{
			title : 'Oneplus 3 Graphite',
			description : 'Selling a new Oneplus 3 I used this guy for maybe a week at which point I switched to a Pixel XL. It comes with all the usual accessories in the retail box plus 2 screen protectors on the side'
		},
		{
           title : '2011 Toyota RAV4 Sport V6 SUV, Crossover',
           description : 'Power windows & locks Power sun roof Power driver seat Extra exterior turn signal on side mirrors CD player, USB input, AUX input, AC Easy access steering wheel cruise/audio controls and temperature check'
       },
       {
           title : '2010 Ford Focus Sedan',
           description : 'The car has heated seats, leather steering wheel, sync, Sirius, etc. Email to arrange to see the car or to get more information. Feel free to make an offer. Thanks'
       },
       {
           title : '2012 Scion iQ Coupe (2 door)',
           description : 'Bluetooth, CD PLAYER, Power doors windows'
       },
       {
           title : '2009 Toyota Corolla LE',
           description : 'Almost new, little kilometers driven, and great condition. Email me for offers'
       },
       {
           title : '2012 Ford Escape SUV, Crossover',
           description : 'Almost new, little kilometers driven, and great condition. Email me for offers'
       },
        {
           title : '2007 Toyota Sienna Minivan With Winter tires',
           description : '2007 White Sienna, seven seats,includes winter tires on rims and summer alloys'
       },
       {
           title : '2007 Volkswagen Rabbit Hatchback',
           description : 'snow tires included, heated seats, air conditioning'
       },
        {
           title : '2007 Volkswagen Rabbit Hatchback',
           description : 'Honda Civic 2004 SI Honda Civic for sale'
       },
       {
           title : 'BRAND NEW AUSTIN GUITAR',
           description : 'if you need give call pls'
       },
       {
           title : 'Stratocaster',
           description : 'Stratocaster style beginner guitar perfect guitar for start play guitar very good condition like new,cool classic 70\'s look,trade for bass can deliver'
       },
       {
           title : 'Fender Stratocaster American Standard Guitar',
           description : 'IN MINT CONDITION! Fender Stratocaster American Standard Guitar with hard case and fender lock strap. Sunburst colour. NO TRADES AND SERIOUS INQUIRIES ONLY PLEASE!'
       },
       {
           title : '2010 Gibson Les Paul Studio with OHSC',
           description : 'I bought this Les Paul Studio for a project guitar and decided to go another direction. It is in excellent condition and comes with the original Gibson hard shell case and case candy. (studios often'
       }
];


function titleAndDescriptionItem(labels, callback){
		var searchTitles = new Fuse(kijijiPostings, { keys: ['title', 'description']});
		var options = {
				shouldSort: true,
				Tokenize: true,
				maxPatternLength: 32,
				keys: ['title', 'description']
		};
		var category = [];
		for (var i = 0; i < labels.length; i++){
			category =  category.concat(searchTitles.search(labels[i]));
		}
		
		for (var i = 0; i < category.length; i++)
			var inputTitle = inputTitle + '. ' + category[i].title;
		
		Algorithmia.client("simDOsDu3LmrqHqrbUubzrebeBR1")
           .algo("algo://nlp/Summarizer/0.1.3")
           .pipe([inputTitle, 1])
           .then(function(response) {
             console.log(response.get());
           });
		   
		   for (var i = 0; i < category.length; i++)
			var inputDescription = inputDescription + '. ' + category[i].description;
		
		Algorithmia.client("simDOsDu3LmrqHqrbUubzrebeBR1")
           .algo("algo://nlp/Summarizer/0.1.3")
           .pipe([inputDescription, 3])
           .then(function(response) {
             console.log(response.get());
           });
	}

titleAndDescriptionItem(['Toyota', 'Austin'], console.log);