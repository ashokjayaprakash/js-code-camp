class Shopper {

    constructor(name='unnamed person') {
        this._name = name;
        this._shoppingList = [];
    }

    set name(value) {
        this._name = value;
    }

    get name() {
        return this._name;
    }

    get shoppingList() {
        return this._shoppingList.join(', ');
    }

    addItemToList(item) {
        this._shoppingList.push(item);
    }

    cloned() {
        let cloneObject = Object.getPrototypeOf(this);
        let newObject = Object.create(cloneObject);

        newObject._name = this.name;
        newObject._shoppingList = [...this._shoppingList];

        return newObject;
    }

}

module.exports = Shopper;
