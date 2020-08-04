class Stack {
    constructor() {
        this.element = [];
        this.size = 0
    }

    push(data) {
        this.element.push(data)
        this.size += 1
    }

    pop() {
        if(this.size == 0) throw("No Element")
        this.size -= 1
        return this.element.pop()
    }

    peek() {
        if(this.size == 0) throw("No Element")
        return this.element[this.size - 1]
    }

    size() {
        return this.size;
    }
}

module.exports.Stack = Stack