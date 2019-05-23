/*
class NodeDoublyLinkedList {
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
    var node = new NodeDoublyLinkedList(_item);
    if (!this.left) {
      this.left = node;
      this.right = node;
    } else {
      node.right = this.right;
      this.right.left = node;
      this.right = node;
    }
  }
}*/


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

Tree.prototype.traverseDF = function (callback) {
  (function recurse(currentNode) {
    for (var i = 0, length = currentNode.children.length; i < length; i++) {
      recurse(currentNode.children[i]);
    }

    callback(currentNode);
  })(this._root);
};

Tree.prototype.traverseBF = function (callback) {
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

Tree.prototype.contains = function (callback, traversal) {
  traversal.call(this, callback);
};

Tree.prototype.append = function (data, toData, traversal) {
  var child = new Node2(data),
    parent = null;
  var callback = function (node) {
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


/* LINKED LIST */

function NodeLinkedList(_data) {
  this.data = _data;
  this.next = null;
}

function LinkedList() {
  this._length = null;
  this.head = null;
}

LinkedList.prototype.append = function (_item) {
  var node = new NodeLinkedList(_item);

  if (!this.head) {
    this.head = node;
    this._length += 1;
    return node;
  }

  while (this.head.next) {
    this.head = this.head.next;
  }

  this.head.next = node;
  this._length += 1;

  return node;
};

LinkedList.prototype.getSize = function () {
  return this._length;
};

LinkedList.prototype.removeHead = function () {
  if (!this.head) {
    return;
  }

  this.head = this.head.next;
  this._length -= 1;
  return this.head;
};

LinkedList.prototype.remove = function (_item) {
  var currentNode = this.head;
  while (currentNode.next) {
    if (currentNode == _item) {
      var next = currentNode.next;
      var nNext = next.next;
      next = null;
      currentNode.next = nNext;
      return this;
    }
  }
};

/* DOUBLE LINKED LIST */
function NodeDoublyLinkedList(_data) {
  this.data = _data;
  this.next = null;
}

function DoublyLinkedList() {
  this.left = null;
  this.right = null;
  this._length = 0;
}

DoublyLinkedList.prototype.append = function (_item) {
  var node = new NodeDoublyLinkedList(_item)

  if (!this.left) {
    this.left = node;
    this.right = node;
  }
  else {
    node.right = this.right;
    this.right.left = node;
    this.right = node;
  }

  this._length += 1;
  return node

}
