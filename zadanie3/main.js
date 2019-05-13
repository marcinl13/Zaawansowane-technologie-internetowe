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
};
