var Shopper = require('./Shopper');


var scout = new Shopper();
scout.addItemToList('camping knife');
scout.addItemToList('tent');
scout.addItemToList('backpack');
scout.addItemToList('map');


var alex = scout.cloned();
alex.name = "D1";
alex.addItemToList('slingshot');

var eve = scout.cloned();
eve.name = "D2";
eve.addItemToList('reading light');

console.log( `${alex.name}: ${alex.shoppingList}` );
console.log( `${eve.name}: ${eve.shoppingList}` );
