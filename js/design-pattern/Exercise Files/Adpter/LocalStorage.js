const { writeFile, readFileSync, existsSync, unlink } = require('./FileProxy');

class LocalStorage {

    constructor() {
        if(existsSync('ls.json')) {
            let data = readFileSync('ls.json');
            this.item = JSON.parse(data);
        } else {
            this.item = {};
        }        
    }

    getItem(key) {
        return this.item[key];
    }

    length() {
        return Object.keys(this.item).length;
    }

    setItem(key, value) {
        this.item[key] = value;
        writeFile('ls.json', JSON.stringify(this.item), (err) => {
            if(err) console.log("Err :", err);
            console.log("successfully stored an item");
        })
        return this.item;
    }

    clear() {
        this.item = {};
        unlink('ls.json', () => {
            console.log("cleared all items");    
        })
        return this.item;
    }
}

module.exports = LocalStorage;
