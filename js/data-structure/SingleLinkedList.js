//https://www.cs.cmu.edu/~adamchik/15-121/lectures/Linked%20Lists/linked%20lists.html

class Node {
    constructor(value, next) {
        this.value = value
        this.next = next
    }
}

class SingleLinkedList {

    constructor() {
        this.head = null
    }

    addFirst(e) {
        this.head = new Node(e, this.head)
    }

    addLast(e) {
        if (!this.head) {
            this.addFirst(e)  
        } else {
            let temp = this.head
            while(temp.next != null) temp = temp.next
            temp.next = new Node(e, null)
        }
    }

    insertAfter(key, e) {
        let temp = this.head
        while(temp.next != null && temp.value != key) temp = temp.next
        if(temp.value == key) {
            temp.next = new Node(e, temp.next)
        }        
    }

    insertBefore(key, e) {
        let temp = this.head
        let previous = null
        while(temp.next != null && temp.value != key) {
            previous = temp
            temp = temp.next
        } 
        if(temp.value == key) {
            previous.next = new Node(e, previous.next)
        }        
    }

    delete(key) {
        let curr = this.head
        let prev = null
        if(curr == null) throw(new Error('List is empty'))

        while(curr.next != null && curr.value != key) {
            prev = curr
            curr = curr.next
        }

        if(curr.value == key) {
            prev.next  = (curr.next) ? curr.next : null
        }
    }

    iterator() {
        return new SingleLinkedListIterator(this.head)
    }
    
    print() {
        console.log(JSON.stringify(this.head))
    }

    copy() {
        let temp = this.head
        let list = new SingleLinkedList()
        while(temp != null) {
            list.addFirst(temp.value)
            temp = temp.next
        }
        return list
    }
}

class SingleLinkedListIterator {
    constructor(item) {
        this.item = item
    }

    hasNext() {
        return (this.item != null)
    }

    next() {
        let value = this.item.value
        this.item = this.item.next 
        return value
    }
}

let s = new SingleLinkedList();
s.addFirst('A')
s.addLast('B')
s.addLast('C')
s.addFirst('Z')
s.insertAfter('ZZ', 'Y')
s.insertBefore('B', 'R')
s.print()
s.delete('R')
s.print()
let list = s.iterator()

while(list.hasNext()) {
    console.log(list.next())
}

let b = s.copy()
b.print()
