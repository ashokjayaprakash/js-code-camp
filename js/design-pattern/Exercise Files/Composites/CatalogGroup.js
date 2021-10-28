class CatalogGroup {

    constructor(name, composite = []) {
        this.name = name;
        this.composite = composite
    }

    get total() {
        console.log(JSON.stringify(this.composite));
        return this.composite.reduce( (tot, nx) => { 
            return tot + nx.total 
        }, 0 );
        //return this.composites.reduce((total, nextItem) => {return total + nextItem.total},0);
    }

    print() {
        this.composite.forEach((data) => {
            data.print();
        })
    }

}

module.exports = CatalogGroup;