class ArrayQueue {
    constructor() {
        this.element = [];
        this.length = 0
        this.frontIndex = 0
        this.backIndex = -1
    }

    isEmpty() {
        return (this.length == 0)
    }

    /**
     * Increment the back index and assin the value in element array
     * Increase the queue length 
     * @param {*} value 
     */
    enqueue(value) {
        this.backIndex++
        this.element[this.backIndex] = value
        this.length++
    }

    /**
     * Get the front element which is waiting first in the queue and return back the value
     * While dequeue set the front element value as null, since its removed from queue
     * Decrease the queue length as element moves away from the queue
     * @param {*} value 
     */
    dequeue() {
        if(this.isEmpty()) throw(new Error("No elements in the queue"))
        const value = this.getFront()
        this.element[this.frontIndex] = null
        this.frontIndex++
        this.length--
        return value
    }

    /**
     * Get the front element which is waiting first in the queue and return back the value
     */
    getFront() {
        if(this.isEmpty()) throw(new Error("No elements in the queue"))        
        return this.element[this.frontIndex]
    }

    clear() {
        this.element = []
        this.length = 0
        this.backIndex = 0
        this.frontIndex = -1
    }
}

try {
    let queue = new ArrayQueue();
    queue.enqueue(1)
    queue.enqueue(2)
    queue.enqueue(3)
    queue.enqueue(4)
    
    // Now the array elements = [1, 2, 3, 4]
    queue.dequeue()
    queue.dequeue()

    // Now the array elements = [null, null, 3, 4]
    queue.enqueue(1)
    queue.enqueue(2)

    // Now the array elements = [null, null, 3, 4, 1, 2]
    console.log(queue.getFront()) 
    // Front - 3
        
} catch (error) {
    console.log(error)
}


// module.exports.CircularQueue = CircularQueue