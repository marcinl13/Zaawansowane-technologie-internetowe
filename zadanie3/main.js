class Factory {
  constructor() {
    this.arrayBuffor = [];
    this.type = null;
    this.typeName = "";
  }

  appendType(_type) {
    if (_type == "DoublyLinkedList") {
      this.type = new DoublyLinkedList();
      this.typeName = "DoublyLinkedList";
    }
    if (_type == "LinkedList") {
      this.type = new LinkedList();
      this.typeName = "LinkedList";
    }

    if (_type == "Tree") {
      // var tree = new Tree(0);
      // tree.append("VP of Happiness", 0, tree.traverseBF);

      this.typeName = "Tree";
      this.type = new Tree(0);
    }
  }

  append(_item, _item2 = null) {
    if (this.typeName == "DoublyLinkedList") {
      this.type.append(_item);
      this.arrayBuffor.push(_item);
      this.type.args = this.arrayBuffor;
    }

    if (this.typeName == "LinkedList") {
      this.type.append(_item);
      this.arrayBuffor.push(_item);
      this.type.args = this.arrayBuffor;
    }

    if (this.typeName == "Tree") {
      var tree = this.type;
      tree.append(_item, _item2, tree.traverseDF);
      this.arrayBuffor.push({ _item, _item2 });
      this.type = tree;
    }
  }

  show(title = "") {
    console.log(title);
    console.log(this.type);
  }

  serialize() {
    var test = {
      class: this.typeName,
      data: this.arrayBuffor
    };
    var serialized = JSON.stringify(test);

    document.body.innerHTML += `<div style="margin-bottom:10rem;">serialized <br/>
        &nbsp;type: ${this.typeName} <br/>
        &nbsp;output: ${serialized}</div>`;

    return serialized;
  }

  deserialize(_data) {
    var parsed = JSON.parse(_data);
    var b = new Factory();

    if (parsed.class == "DoublyLinkedList") {
      b.appendType(parsed.class);

      parsed.data.forEach(element => {
        b.append(element);
      });
    }

    if (parsed.class == "LinkedList") {
      b.appendType(parsed.class);

      parsed.data.forEach(element => {
        b.append(element);
      });
    }

    if (parsed.class == "Tree") {
      b.appendType(parsed.class);

      parsed.data.forEach(element => {
        b.append(element._item, element._item2);
      });
    }

    //clone
    this.typeName = b.typeName;
    this.type = b.type;
    this.arrayBuffor = b.arrayBuffor;

    // b.show();
    // return b;
  }
}

window.onload = () => {
  var factory = new Factory();
  factory.appendType("DoublyLinkedList");
  factory.append(1);
  factory.append(2);
  factory.append(3);
  factory.show("\r\n-----------------show DoublyLinkedList: ");
  var serialized = factory.serialize();

  deserialization = new Factory();
  deserialization.deserialize(serialized);
  deserialization.show("\r\ndeserialization:");
  deserialization.append(15);
  deserialization.show("\r\nmodify deserialization:");


  var factory = new Factory();
  factory.appendType("Tree");
  factory.append("12", 0);
  factory.append("VP of Finance", 0);
  factory.append("VP of Sadness", 0);
  factory.append("Director of Puppies", "12");
  factory.append("Manager of Puppies", "Director of Puppies");
  factory.show("\r\n-----------------show Tree");
  var serialized = factory.serialize();

  deserialization = new Factory();
  deserialization.deserialize(serialized);
  deserialization.show("\r\ndeserialization: ");
  deserialization.append(1, 0);
  deserialization.show("\r\nmodify deserialization:");

 
  var factory = new Factory();
  factory.appendType("LinkedList");
  factory.append(1);
  factory.append(2);
  factory.append(3);
  factory.show("\r\n-----------------show LinkedList: ");
  var serialized = factory.serialize();

  deserialization = new Factory();
  deserialization.deserialize(serialized);
  deserialization.show("\r\ndeserialization: ");
  deserialization.append(6);
  deserialization.show("\r\nmodify deserialization:");


  var linked = new DoublyLinkedList()
  linked.append(1)
  linked.append(11)
  linked.append(12)
  console.log(linked)

};
