// binary search tree
class Node {
  constructor(element, parent) {
    this.element = element;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(compare) {
    this.root = null;
    this.compare = compare || this.compare
  }
  compare(el, e2){
      return e1 > e2 ? 'right' : 'left';
  }
  add(element) {
    if (this.root === null) {
      this.root = new Node(element, null);
      return;
    }
    let parentNode;
    let currentNode = this.root;
    while(currentNode){
        const compare = this.compare(element, currentNode.element);
        parentNode = currentNode;
        currentNode = currentNode[compare];
    }
    const compare = this.compare(element, parentNode.element);
    parentNode[compare] = new Node(element, parentNode);
  }
}

const tree = new Tree((e1, e2) => {
  return e1 > e2 ? 'right' : 'left';
});

tree.add(10);
tree.add(8); 
tree.add(19);
tree.add(6);
tree.add(15);
tree.add(22);
tree.add(20);
console.dir(tree, { depth: 1000 });
