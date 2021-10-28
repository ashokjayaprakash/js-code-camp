const fs = require('fs');

class FileProxy {

    constructor() {
        return Object.assign({}, fs);        
    }

    readFile(path, type, callback) {

        if(!path.match(/.json$/)) {
            callback(new Error("JSON files only supported"))
        }
        fs.readFile(path, type, callback);
    }

}

exports.module = new FileProxy();