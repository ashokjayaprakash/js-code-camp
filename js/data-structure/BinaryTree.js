class Node {
    constructor(item) {
        this.item = item
        this.left = this.right = null
    }
}

class BinaryTree {
    constructor() {
        this.root = null
    }

    insert(item) {
        if(this.root == null) {
            this.root = new Node(item) 
        }

        

    }
    
}


let bt = new BinaryTree();
bt.root = new Node(1)
bt.root.left = new Node(2)
bt.root.right = new Node(3)

bt.root.left.left = new Node(4)
bt.root.left.right = new Node(6)

console.log(bt)

module.exports.BinaryTree = BinaryTree