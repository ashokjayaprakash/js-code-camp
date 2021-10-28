function createWritableStream(ws) {
    const proto = Object.getPrototypeOf(ws)

    function LoggWritable(ws) {
        this.ws = ws;
    }

    LoggWritable.prototype = Object.create(proto);
    
    //Proxied Method
    LoggWritable.prototype.write = function(c, e, cb) {
        console.log("Data :", c);
        return this.ws.write(c, e, () => {
            console.log("Finished :", c);
            cb && cb()
        });
    }

    // Decorated function to return the size of the file
    LoggWritable.prototype.size = function() {
        console.log("1 Mb")
        return "1 MB"
    }

    // Delegated Method
    LoggWritable.prototype.end = function () {
        console.log("Arg : ", arguments)
        return this.ws.end.apply(this.ws, arguments)
    }

    return new LoggWritable(ws);

}

module.exports = {
    createWritableStream
}