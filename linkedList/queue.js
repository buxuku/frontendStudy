const LinkedList = require('./index');

class Queue{
    constructor(){
        this.queue = new LinkedList;
    }
    add(element){
        this.queue.add(element);
    }
    offer(){
       return this.queue.remove(0)
    }
}
module.exports = Queue;

let queue = new Queue;
queue.add(1);
queue.add(2);
console.log(queue.offer())
console.log(queue.offer())