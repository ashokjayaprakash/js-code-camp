function print() {
    console.log(3)
}

function doPrint(p) {
    p()
}

// setTimeout(()=> {  })
doPrint(print)
Promise.resolve().then(() => console.log(2));
console.log(1); // 1, 2


const getUserInfo = () => { return Promise.resolve({ id: 1, name: 'Jhon' }) }
const getProductQuantity = () => { return Promise.resolve({ id: 1, name: 'Pizza', prize: 50 }) }
const processPayment = () => { return Promise.resolve({ isSuccess: true }) }
const shipment = () => { return Promise.resolve({ isSuccess: true }) }

// Order Processing Workflow uisng callback
getUserInfo()
.then(() => getProductQuantity())
.then(() => processPayment() )
.then(() => shipment() )
.then(() => {
    // Do notification
} )
.catch(() => handleError())
