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
    this.compare = compare || this.compare;
  }
  compare(el, e2) {
    return e1 > e2 ? 'right' : 'left';
  }
  add(element) {
    if (this.root === null) {
      this.root = new Node(element, null);
      return;
    }
    let parentNode;
    let currentNode = this.root;
    while (currentNode) {
      const compare = this.compare(element, currentNode.element);
      parentNode = currentNode;
      currentNode = currentNode[compare];
    }
    const compare = this.compare(element, parentNode.element);
    parentNode[compare] = new Node(element, parentNode);
  }
  //前序遍历，通过递归的方式实现
  preOrderTraversal(fn) {
    function traversal(node) {
      if (!node) return;
      fn(node);
      traversal(node.left);
      traversal(node.right);
    }
    traversal(this.root);
  }
  //前序遍历，通过栈的方式实现
  preOrderTraversalByStack(fn) {
    const stack = [this.root];
    while (stack.length) {
      const current = stack.pop();
      fn(current);
      if (current.right) {
        stack.push(current.right);
      }
      if (current.left) {
        stack.push(current.left);
      }
    }
  }
  //层序遍历
  levelTraversal(fn) {
    const stack = [this.root];
    while (stack.length) {
      const current = stack.shift();
      fn(current);
      if (current.left) {
        stack.push(current.left);
      }
      if (current.right) {
        stack.push(current.right);
      }
    }
  }
  //中序遍历
  inOrderTraversal(fn) {
    function traversal(node) {
      if (!node) return;
      traversal(node.left);
      fn(node);
      traversal(node.right);
    }
    traversal(this.root);
  }
  //后序遍历
  postOrderTraversal(fn) {
    function traversal(node) {
      if (!node) return;
      traversal(node.left);
      traversal(node.right);
      fn(node);
    }
    traversal(this.root);
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
// console.dir(tree, { depth: 1000 });
// tree.preOrderTraversal((node) => console.log(node.element));
// tree.preOrderTraversalByStack((node) => console.log(node.element));
// tree.levelTraversal((node) => console.log(node.element));
// tree.inOrderTraversal((node) => console.log(node.element));
tree.postOrderTraversal((node) => console.log(node.element));
