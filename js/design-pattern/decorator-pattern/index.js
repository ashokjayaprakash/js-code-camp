/**
Dynamically agumenting the behaviour of an existing object and adding new functionalities.
*/

const fs = require('fs');
const {createWritableStream} = require('./createWritableLog')

let ws = fs.createWriteStream("name.txt");

let px = createWritableStream(ws);
px.write("Hello");
px.write("World");
ws.write("Hey")
px.end();
px.size()
