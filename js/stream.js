const { pipeline } = require('stream')
const http = require('http')

const { readFile, createReadStream, createWriteStream } = require('fs')
const server = http.createServer((req, res) => {
    let stream = createReadStream('./test.js')
    stream.pipe(res)   
})
// server.listen(3000)

// Pipeline function to stream data
pipeline(
    createReadStream('./test.js'),
    createWriteStream('./test.js.stream'),
    console.log
)


