
function Queue() {
  this.dataStore = [];
  this.enqueue = function enqueue(element) {
    this.dataStore.push(element);
  };
  this.dequeue = function dequeue() {
    return this.dataStore.shift();
  };
  this.front = function front() {
    return this.dataStore[0];
  };
  this.back = function back() {
    return this.dataStore[this.dataStore.length - 1];
  };
}

function Node2(data) {
  this.data = data;
  this.parent = null;
  this.children = [];
}

function Tree(data) {
  var node = new Node2(data);
  this._root = node;
}

Tree.prototype.traverseDF = function(callback) {
  (function recurse(currentNode) {
    for (var i = 0, length = currentNode.children.length; i < length; i++) {
      recurse(currentNode.children[i]);
    }

    callback(currentNode);

  })(this._root);
};

Tree.prototype.traverseBF = function(callback) {
  var queue = new Queue();

  queue.enqueue(this._root);

  currentTree = queue.dequeue();

  while (currentTree) {
    for (var i = 0, length = currentTree.children.length; i < length; i++) {
      queue.enqueue(currentTree.children[i]);
    }

    callback(currentTree);
    currentTree = queue.dequeue();
  }
};

Tree.prototype.contains = function(callback, traversal) {
  traversal.call(this, callback);
};

Tree.prototype.add = function(data, toData, traversal) {
  var child = new Node2(data),
    parent = null;
  var callback = function(node) {
    if (node.data === toData) {
      parent = node;
    }
  };

  this.contains(callback, traversal);

  if (parent) {
    parent.children.push(child);
    child.parent = parent;
  } else {
    throw new Error("Cannot add node to a non-existent parent.");
  }
};

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
    this.args = [];
  }
}

class DoublyLinkedList {
  constructor() {
    this.left = null;
    this.right = null;
  }

  append(_item) {
    var node = new Node(_item);
    if (!this.left) {
      this.left = node;
      this.right = node;
    } else {
      node.right = this.right;
      this.right.left = node;
      this.right = node;
    }
  }
}

