class Node{
    constructor(element, next){
        this.element = element;
        this.next = next;
    }
}

class LinkedList{
    constructor(){
        this.head = null;
        this.size = 0;
    }
    _node(index){
        let node = this.head;
        for(let i = 0; i < index; i++){
            node = this.head.next;
        }
        return node;
    }
    add(index, element){
        if(arguments.length === 1){
            element = index;
            index = this.size;
        }
        if(index === 0){
            this.head = new Node(element, this.head);
        }else{
            const preNode = this._node(index - 1);
            console.log(index, preNode)
            preNode.next = new Node(element, preNode.next);
        }
        this.size++;
    }
    remove(index){
        if(!this.head) return;
        let removedNode;
        if(index === 0){
            removedNode = this.head;
            this.head = this.head.next;
        }else{
            const preNode = this._node(index - 1);
            removedNode = preNode.next;
            preNode.next = preNode.next.next;
        }
        this.size --;
        return removedNode.element;
    }
    set(index, element){
        const node = this._node(index);
        node.element = element;
    }
    get(index){
        return this._node(index)
    }
    reverseList(){
        function reverse(head){
            if(head == null || head.next == null) return head;
            const newHead = reverse(head.next);
            head.next.next = head;
            head.next = null;
            return newHead;
        }
        this.head = reverse(this.head);
        return this.head;
    }
    reverseList2(){
        let newNode = new LinkedList;
        let head = this.head;
        while(head){
            newNode.add(0, head.element);
            head = head.next;
        }
        this.head = newNode.head;
        return this.head;
    }
    reverseList3(){
        let head = this.head;
        let newHead = null;
        while(head){
            let temp = head.next;
            head.next = newHead;
            newHead = head;
            head = temp;
        }
        this.head = newHead;
        return this.head;
    }
}

module.exports = LinkedList

const ll = new LinkedList;
ll.add(0,1);
ll.add(0,2);
ll.add(0,3);
ll.add(2, 4);
console.dir(ll, {depth: 1000})
ll.remove(2);
console.dir(ll, {depth: 1000})
console.log(ll.get(2))

ll.reverseList3();
console.dir(ll, {depth: 1000})