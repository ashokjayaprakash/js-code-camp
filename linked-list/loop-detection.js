class Node {    

    constructor(value, next) {
        this.value = value
        this.next = next
        
    }
}

class LinkedList {

    constructor() {
        this.head = null
    }

    add(value) {
        if(this.head != null) {
            this.head = this.head.next
        }
        this.head = new Node(value, null)        
    }

    print() {
        console.log(JSON.stringify(this.head))
    }

}

let a = new LinkedList()
a.add(1)
a.add(2)
a.add(3)
a.add(5)
a.add(6)
a.print()

