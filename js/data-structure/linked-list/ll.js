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

    add(value) {
        if(!this.head) {
            this.head = new  Node(value, null)
        } else {
            let temp = this.head
            while(temp.next != null) {
                temp = temp.next
            }
            temp.next = new Node(value, null)
        }
    }

    delete(value) {
        let temp = this.head;
        if(temp.value == value) {
            this.head = temp.next
        }
        while(temp.next != null) {            
            if(temp.next.value == value) {
                if(temp.next.next) {
                    temp.next = temp.next.next                           
                } else {
                    temp.next = null
                }
                break;
            }
            temp = temp.next
        }
    }

    print() {
        console.log(JSON.stringify(this.head))
    }
}

function findIntersection(list1, list2) {

    let set = new Set();

    while(list1 != null) {
        set.add(list1)
        list1 = list1.next
    }

    while(list2 != null) {
        if(set.has(list2)) {
            console.log(list2.value)
            return 
        }
        list2 = list2.next
    }

}

let list = new SingleLinkedList()
let list2 = new SingleLinkedList()
// creating first linked list
list.head = new Node(3);
list.head.next = new Node(6);
list.head.next.next = new Node(9);
list.head.next.next.next = new Node(15);
list.head.next.next.next.next = new Node(30);

list2.head = new Node(10);
list2.head.next = list.head.next.next.next

list.print()
list2.print()


findIntersection(list.head, list2.head)
