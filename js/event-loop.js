// Example for adding message
const date = new Date().getSeconds()

console.log(date)

// Add setTimeOut in message; Due to message waiting in queue setTimeout will execute after while loop
setTimeout(() => {
    let date = new Date().getSeconds()
    console.log(date)
}, 1500)

// Message in queue
while(date + 2 > (new Date().getSeconds())) {
}

/**
 * Run to Completion [ Each message is processed completely b4 other message gets processed ]
 * In JS every message in the loop processed sequentially and once the call stack is empty next message 
 * will be picked up and processed
 */
 

