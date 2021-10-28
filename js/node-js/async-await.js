/**
 * Callback vs Promise vs Async 
 * 
 * Callback info and types of call back A/Synchronous
 * 
 * Promise
 * 3 States of Promise
 * 
 * Advantages of Promise over callback
 * 
 * Async Await 
 * Advantages of Async Await over callback
 * Downfall of Async Await over callback
 */

// let a = Promise.resolve("Hello");
// console.log(a);




// function print() {
//     console.log("Timeout End")
// }
// // The callback function print shall be invoked after 1 second 
// setTimeout(print, 1000)


// function sayHello(text, callback) {
//     callback(text)
// }

// sayHello("Hello", print)


// Simple Payment flow

// // Order Processing Workflow uisng callback
// getUserInfo(userId, (error, userInfo)=> {
//     getProductQuantity(prouctId, (error, prouctInfo)=> {
//         const orderInfo = { userInfo, prouctInfo }
//         processPayment(orderInfo, (error, paymentInfo) => {
//             shipment(orderInfo, (error, shipmentInfo) => { 
//                 // Do shipment notifcation
//             })
//         })
//     })
// })

// const getUserInfo = () => { return Promise.resolve({ id: 1, name: 'Jhon' }) }
// const getProductQuantity = () => { return Promise.resolve({ id: 1, name: 'Pizza', prize: 50 }) }
// const processPayment = () => { return Promise.resolve({ isSuccess: true }) }
// const shipment = () => { return Promise.resolve({ isSuccess: true }) }

// // Order Processing Workflow uisng callback
// getUserInfo(userId)
// .then(getProductQuantity(prouctId))
// .then(processPayment(orderInfo))
// .then(shipment(orderInfo))
// .catch(handleFailure)


const setIntervalPromisified = (interval) => {
    const callback = (res, rej) => {
        setInterval(()=> {
            res(`Fullfilled in ${interval} ms`)
        }, interval)
    }
    return new Promise(callback)
}

// const response = setIntervalPromisified(1000)
// console.log(response)
// response.then(console.log)


/**
 * Downside of the async await block the code similar to 
 */

const slowAsyncOperation = async () => {
    console.time("slowAsyncOperation")
    await setIntervalPromisified(1000)
    await setIntervalPromisified(1000)
    await setIntervalPromisified(1000)
    console.timeEnd("slowAsyncOperation")
}

const fastAsyncOperation = async () => {
    console.time("fastAsyncOperation")
    let setIntervalPromisified1 = setIntervalPromisified(1000)
    let setIntervalPromisified2 = setIntervalPromisified(1000)
    let setIntervalPromisified3 = setIntervalPromisified(1000)

    await setIntervalPromisified1
    await setIntervalPromisified2
    await setIntervalPromisified3
    console.timeEnd("fastAsyncOperation")
}

const fastPromiseOperation = () => {
    console.time("fastAsyncOperation")

    let setIntervalPromisified1 = setIntervalPromisified(1000)
    let setIntervalPromisified2 = setIntervalPromisified(1000)
    let setIntervalPromisified3 = setIntervalPromisified(1000)

    setIntervalPromisified1
    .then((data) => {
        console.log(data)
        return setIntervalPromisified2
    })
    .then((data) => {
        console.log(data)
        return setIntervalPromisified3
    })
    .finally(() => {
        console.timeEnd("fastAsyncOperation")
    })    
    
}

const fastAsyncOperationPromiseAll = async () => {
    console.time("fastAsyncOperationPromiseAll")    
    await Promise.all([setIntervalPromisified(1000), setIntervalPromisified(1000), setIntervalPromisified(1000)])
    console.timeEnd("fastAsyncOperationPromiseAll")
}

slowAsyncOperation()
// fastAsyncOperationPromiseAll()
fastAsyncOperation()

// fastPromiseOperation()

