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

class GraphNode {
  constructor(_data) {
    this.data = _data;
    this.parent = null;
    this.children = [];
  }
}

class Tree {
  constructor(_data) {
    var node = new GraphNode(_data);
    this._root = node;
    this.head = null;
  }

  add(_g, _val) {
    var node = new GraphNode(_val);

    if (!this.head) {
      this.head = node;
    } else if (_g == 0) {
      this.head.children.push(node);
      this.head.children[_g].parent = node;
    } else {
      this.head.children[_g].children.push(new GraphNode(_val));
      this.head.children[_g].children.forEach(element => {
        element.parent = this.head.children[_g];
      });
      // console.log(this.head.children[_g].children);
    }
  }
}

class Graph {
  constructor() {
    this.noOfVertices = null;
    this.AdjList = new Map();
  }
  addVertex(v) {
    this.AdjList.set(v, []);
  }
  addEdge(v, w) {
    this.AdjList.get(v).push(w);
    this.AdjList.get(w).push(v);
  }

  printGraph() {
    console.log(this.AdjList);
    var get_keys = this.AdjList.keys();

    for (var i of get_keys) {
      var get_values = this.AdjList.get(i);
      var conc = "";
      for (var j of get_values) conc += j + " ";

      console.log(i + " -> " + conc);
    }
  }
}

/**wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
 *
 */

class Buffor {
  constructor() {
    this.arrayBuffor = [];
    this.type = null;
    this.typeName = "";
  }

  addType(_type) {
    if (_type == "DoublyLinkedList") {
      this.type = new DoublyLinkedList();
      this.typeName = "DoublyLinkedList";
    }
  }

  add(_item) {
    this.type.append(_item);
    this.arrayBuffor.push(_item);
    this.type.args = this.arrayBuffor;
  }

  show() {
    console.log(this.type);
  }

  serialize() {
    var test = {
      class: this.typeName,
      data: this.arrayBuffor
    };
    var serialized = JSON.stringify(test)
    
    document.body.innerHTML =
      `serialized <br/>
        &nbsp;type: ${this.typeName} <br/>
        &nbsp;output: ${serialized}`;

    return serialized;
  }

  deserialize(_data) {
    var parsed = JSON.parse(_data);

    if (parsed.class == "DoublyLinkedList") {
      var b = new Buffor();
      b.addType(parsed.class);

      parsed.data.forEach(element => {
        b.add(element);
      });

      b.show();
      return b;
    }
  }
}

window.onload = () => {
  var b = new Buffor();
  b.addType("DoublyLinkedList");
  b.add(0, 1);
  b.add(1, 2);
  b.add(1, 3);
  b.show();
  b.serialize();

  var sesialized = '{"class":"DoublyLinkedList","data":[1,2,3]}';
  var c = new Buffor();
  c.deserialize(sesialized);

  var g = new Graph();
  var vertices = [0, 1, 2, 3, 4, 5, 6];

  // adding vertices
  for (var i = 0; i < vertices.length; i++) {
    g.addVertex(vertices[i]);
  }

  // adding edges
  g.addEdge(0, 1);
  g.addEdge(1, 2);
  g.addEdge(1, 4);
  g.addEdge(1, 5);
  g.addEdge(2, 3);
  g.addEdge(4, 5);
  g.addEdge(5, 6);
  g.addEdge(5, 3);
  g.addEdge(3, 6);
  // g.printGraph();

  var tree = new Tree();

  tree._root.children.push(new GraphNode("two"));
  tree._root.children[0].parent = tree;

  tree._root.children.push(new GraphNode("three"));
  tree._root.children[1].parent = tree;

  tree._root.children.push(new GraphNode("four"));
  tree._root.children[2].parent = tree;

  tree._root.children[0].children.push(new GraphNode("five"));
  tree._root.children[0].children[0].parent = tree._root.children[0];

  tree._root.children[0].children.push(new GraphNode("six"));
  tree._root.children[0].children[1].parent = tree._root.children[0];

  tree._root.children[0].children.push(new GraphNode("six2"));
  tree._root.children[0].children[2].parent = tree._root.children[0];

  tree._root.children[2].children.push(new GraphNode("seven"));
  tree._root.children[2].children[0].parent = tree._root.children[2];
  console.log(tree);

  var t = new Tree("");
  t.add(0, 1);
  t.add(0, 2);
  t.add(0, 3);
  t.add(0, 4);
  t.add(1, 4);
  t.add(1, 5);
  // t.add(4, 1);
  console.log(t);
};
