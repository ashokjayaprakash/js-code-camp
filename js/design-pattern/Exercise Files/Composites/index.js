const Catalog = require('./Catalog');
const CatalogGroup = require('./CatalogGroup');


let drink = new CatalogGroup("Drinks", [
    new Catalog("Milk", 10),
    new Catalog("Pepsi", 20),
    new Catalog("Coke", 25)
]);

let b = new CatalogGroup("Meat", [
    new Catalog("Chicken", 10),
    new Catalog("Fish", 20)
]);


let c = new CatalogGroup("Product", [drink, b]);

console.log(`Total:, \n${c.total}`);
b.print();
