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