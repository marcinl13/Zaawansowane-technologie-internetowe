class Factory {
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

    if (_type == "Tree") {
      // var tree = new Tree(0);
      // tree.add("VP of Happiness", 0, tree.traverseBF);

      this.typeName = "Tree";
      this.type = new Tree(0);
    }
  }

  add(_item, _item2 = null) {
    if (this.typeName == "DoublyLinkedList") {
      this.type.append(_item);
      this.arrayBuffor.push(_item);
      this.type.args = this.arrayBuffor;
    }

    if (this.typeName == "Tree") {
      var tree = this.type;
      tree.add(_item, _item2, tree.traverseBF);
      this.arrayBuffor.push({ _item, _item2 });
      this.type = tree;
    }
  }

  show() {
    console.log(this.type);
  }

  serialize() {
    var test = {
      class: this.typeName,
      data: this.arrayBuffor
    };
    var serialized = JSON.stringify(test);

    document.body.innerHTML = `serialized <br/>
        &nbsp;type: ${this.typeName} <br/>
        &nbsp;output: ${serialized}`;

    return serialized;
  }

  deserialize(_data) {
    var parsed = JSON.parse(_data);
    var b = new Factory();

    if (parsed.class == "DoublyLinkedList") {
      b.addType(parsed.class);

      parsed.data.forEach(element => {
        b.add(element);
      });
    }

    if (parsed.class == "Tree") {
      b.addType(parsed.class);

      parsed.data.forEach(element => {
        b.add(element._item, element._item2);
      });
    }

    b.show();
    return b;
  }
}

window.onload = () => {
  var facory = new Factory();
  facory.addType("DoublyLinkedList");
  facory.add(1);
  facory.add(2);
  facory.add(3);
  facory.show();
  var serialized = facory.serialize();
  console.log(serialized);
  facory.deserialize(serialized);

  var factory = new Factory();
  factory.addType("Tree");
  factory.add("12", 0);
  factory.add("VP of Finance", 0);
  factory.add("VP of Sadness", 0);
  factory.add("Director of Puppies", "12");
  factory.add("Manager of Puppies", "Director of Puppies");
  factory.show();
  var serialized = factory.serialize();
  console.log(serialized);
  facory.deserialize(serialized);
};
