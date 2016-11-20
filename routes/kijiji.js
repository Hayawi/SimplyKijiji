var express = require('express');
var router = express.Router();
const exec = require('child_process').exec;

function kijCommand(title, description, price) {
  return `curl 'https://www.kijiji.ca/p-submit-ad.html' -H 'origin: https://www.kijiji.ca' -H 'accept-encoding: gzip, deflate, br' -H 'accept-language: en-US,en;q=0.8' -H 'upgrade-insecure-requests: 1' -H 'user-agent: Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36' -H 'content-type: application/x-www-form-urlencoded' -H 'accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8' -H 'cache-control: max-age=0' -H 'authority: www.kijiji.ca' -H 'cookie: machId=a17bae6497ae380ec04b474dd6092685222868f224e4f7626cc6f2c17242d26a3836f1aadcedbc03f242f96e9083b7c0dc6c7bf438db329744387c42cb6f1651; optimizelyEndUserId=oeu1479574311125r0.19117109734839066; cguid=Vcguid=7d8050791580ab122671edb5fcd8ed0c^doml=true^brl=true; __gads=ID=64651f7f33e5e429:T=1479574314:S=ALNI_MZ9ZeWRo4Oi8NcNffXepnrRUCV9yA; fab=0; ab=0; __atuvc=2%7C47; kjses=4c813ca9-803b-4a7f-82e0-0d9706b9f3ae^G19OpR0wUIowsieDvgz6pQ==; siteLocale=en_CA; SSM_GFU=eyJ2ZXJzaW9uIjoyLCJndWlkIjoiNTgzMWYyOTU3ZDI5Y2QwOTBlMDAwMGY1Iiwic2lkIjoiUzIwMTYxMTIwMTg1OTc2MEhuRG80Q3BueHV2SCIsImxhc3Rfc2VlbiI6MTQ3OTY2ODM3NH0=; SSM_UTC=Z3VpZDo6NTgzMWYyOTU3ZDI5Y2QwOTBlMDAwMGY1fHx8c291cmNlOjpnZnU=; SSM_UTC_LS=Z3VpZDo6NTgzMWYyOTU3ZDI5Y2QwOTBlMDAwMGY1fHx8c291cmNlOjpnZnU=; kjrva="1217867012,1217866244,1217867002,1217867507,1217867583,1217868170,1201616009,1217869208,1207680120"; up=%7B%22ln%22%3A%22223265013%22%2C%22gl%22%3A%22li%3D1700273%26ia%3D66.207.221.230%26%22%2C%22ls%22%3A%22l%3D1700272%26sv%3DLIST%26sf%3DdateDesc%22%2C%22rva%22%3A%221207680120%2C1217869208%2C1201616009%2C1217868170%2C1217867583%2C1217867507%2C1217867002%2C1217866244%2C1217867012%22%7D; __utmt_siteTracker=1; _gat=1; JSESSIONID=1D4690BE64E9473C6F52FE0307DDBC67; optimizelySegments=%7B%222206171013%22%3A%22search%22%2C%222211990585%22%3A%22gc%22%2C%222212760107%22%3A%22none%22%2C%222219751317%22%3A%22false%22%2C%226842320387%22%3A%22true%22%7D; optimizelyBuckets=%7B%7D; _ga=GA1.2.1276599942.1479574315; __utma=115975897.1276599942.1479574315.1479672909.1479676416.6; __utmb=115975897.7.10.1479676416; __utmc=115975897; __utmz=115975897.1479676416.6.6.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=(not%20provided); optimizelyPendingLogEvents=%5B%5D; _gali=MainForm; userEmail=pretzo246@gmail.com' -H 'referer: https://www.kijiji.ca/p-admarkt-post-contact-submit.html' --data 'ca.kijiji.xsrf.token=1479676481385.40d941cebb48d7dbf8a032056d66b16b&postAdForm.fraudToken=2e4df122eb7275e9a830603964daaf52&postAdForm.phoneNumber=123-123&postAdForm.email=pretzo246%40gmail.com&uuid=&adId=&postAdForm.galleryImageIndex=0&postAdForm.geocodeLat=43.9232492&postAdForm.geocodeLng=-78.93448139999998&postAdForm.city=Whitby&postAdForm.province=ON&PostalLat=43.914981&PostalLng=-78.912659&categoryId=760&postAdForm.adType=OFFER&postAdForm.priceType=FIXED&postAdForm.priceAmount=${price}&postAdForm.attributeMap%5Bphonebrand_s%5D=other&postAdForm.attributeMap%5Bphonecarrier_s%5D=rogers&postAdForm.attributeMap%5Bforsaleby_s%5D=ownr&postAdForm.title=${title}%21%21&postAdForm.description=${description}&postAdForm.locationId=1700273&locationLevel0=1700273&postAdForm.postalCode=L1R2T5&postAdForm.mapAddress=&file=&images=&postAdForm.youtubeVideoURL=&featuresForm.topAdDuration=7&submitType=saveAndCheckout' --compressed`
}

function execKijiji(title, description, price) {
  const execOptions = {
    maxBuffer: 5000 * 1024, //quick fix
  };

  const command = kijCommand(title, description, price);
  exec(command, execOptions, (error, stdout, stderr) => {
  });
}

router.post('/', function(req, res, next) {
  var title = req.body.title;
  var description = req.body.description;
  var price = req.body.price;

  execKijiji(title, description, price);
});

module.exports = router;
