class Catalog {

    constructor(name, price) {
        this.name = name;
        this.price = price
    }

    get total() {
        return this.price;
    }

    print() {
        console.log(`Sub ITem: ${this.name} - ${this.price}`);
    }

}

module.exports = Catalog;