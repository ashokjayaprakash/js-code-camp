/**
Sample for proxy pateern with object composition

Enhancing the behaviour of the subject with additional preprocessing

A proxy is useful in several circumstances; for example, consider the following ones:
Data validation: The proxy validates the input before forwarding it to the subject
Security: The proxy verifies that the client is authorized to perform the operation
and it passes the request to the subject only if the outcome of the check is positive
Caching: The proxy keeps an internal cache so that the operations are executed
on the subject only if the data is not yet present in the cache
Lazy initialization: If the creation of the subject is expensive, the proxy can delay
it to when it's really necessary
Logging: The proxy intercepts the method invocations and the relative
parameters, recoding them as they happen
Remote objects: A proxy can take an object that is located remotely, and make it
appear local


*/

const fs = require('fs');
const {createWritableStream} = require('./createWritableLog')

let ws = fs.createWriteStream("name.txt");

let px = createWritableStream(ws);
px.write("Hello");
px.write("World");
ws.write("Hey")
px.end("hello");

