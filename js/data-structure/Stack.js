class Stack {
    constructor() {
        this.element = [];
        this.size = 0
    }

    /**
     * To push the element on the stack
     * @param {*} data 
     */
    push(data) {
        this.element.push(data)
        this.size += 1
    }

    /**
     * To remove the element on top of the stack
     * @param {*} data 
     */
    pop() {
        if(this.size == 0) throw("No Element")
        this.size -= 1
        return this.element.pop()
    }

    /**
     * To get the element on top of the stack
     * @param {*} data 
     */
    peek() {
        if(this.size == 0) throw("No Element")
        return this.element[this.size - 1]
    }
    
}

module.exports.Stack = Stack