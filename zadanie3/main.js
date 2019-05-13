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

function Graph(v) {
  this.vertices = v;
  this.edges = 0;
  this.adjList = [];
  for (var i = 0; i < this.vertices; ++i) {
    this.adjList[i] = [];
  }
  this.newEdge = function(v,w) {
    this.adjList[v].push(w);
    this.adjList[w].push(v);
    this.edges++;
  };
  this.printGraph = function() {
    for (var i = 0; i < this.vertices; ++i) {
       var txt = ""
       txt += (i + ": ");
       for (var j = 0; j < this.vertices; ++j) {
          if (this.adjList[i][j] != undefined)
            txt+= (this.adjList[i][j] + ' ');
        }
        console.log(txt);
     }
   };
 };

class Buffor {
  constructor() {
    this.arrayBuffor = [];
    this.type = null;
    this.typeName = "";
  }

  addType(_type){
    if (_type == "DoublyLinkedList") this.type = new DoublyLinkedList();
  }

  add(_item) {
    this.typeName = "DoublyLinkedList";
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
    console.log(JSON.stringify(test));
  }

  deserialize(_data) {
    var parsed = JSON.parse(_data);


    var b = new Buffor();
    b.addType(parsed.class);

    parsed.data.forEach(element => {
      b.add(element);
    });

    b.show();
  }
}

window.onload = () => {
  
  var b = new Buffor();
  b.addType("DoublyLinkedList");
  b.add(1);
  b.add(2);
  b.add(3);

  b.show();
  b.serialize();
  var sesialized = '{"class":"DoublyLinkedList","data":[1,2,3]}';
  var c = new Buffor();
  c.deserialize(sesialized);


  var myGraph = new Graph(5);
  myGraph.newEdge(0, 1);
  myGraph.newEdge(0, 2);
  myGraph.newEdge(2, 4);
  myGraph.newEdge(2, 3);
  myGraph.newEdge(3, 4);
  myGraph.printGraph()
};
