var BTree = function(){
  this.root = new BTree.Node();
};

BTree.prototype.insert = function(value) {
  this.root = this.root.insert(value);
};

BTree.Node = function(parent){
  this.order = 2;
  this.keys = [];
  this.children = [];
  this.parent = parent;
};

BTree.Node.prototype.insert = function(value, left, right){
  if (_.contains(this.keys, value)) { throw new Error('not allowing duplicate values'); }

  if(this.children.length && !(left || right)){
    this.findChild(value).insert(value);
  } else {
      this.keys = _(this.keys.concat([value])).sortBy(function(item){
        return item;
      });
      if(left && right){this.children = _(this.children.concat([left, right])).sortBy(function(child){
        return child.keys[0];
        });
      }
    if (this.order < this.keys.length) {
      var middle = Math.floor(this.keys.length/2);
      this.promoteValue(
        this.keys[middle],
        // NOTE: fix constructor to accept list of keys
        new BTree.Node(this.keys.slice(0, middle)),
        new BTree.Node(this.keys.slice(middle+1))
      );
    }
  }
};

BTree.Node.prototype.findNode = function(value){
  return _(this.keys).reduce(function(child, key, index){
    return child || value < key && this.children[index];
  }, null) || _(this.children).last();
};

BTree.Node.prototype.promoteValue = function(value, left, right){
  if(this.parent.root){ //this is now wrong..no parent tree
    var bTree = this.parent;
    bTree.root = new BTree.Node(this.parent);
    bTree.root.insert(value);
    bTree.root.children.push(left);
    bTree.root.children.push(right);
    left.parent = bTree.root;
    right.parent = bTree.root;
  } else if (this.parent.hasRoomForPromotion()) {
    var index = this.parent.findIndexForInsertion(value);
    this.parent.keys.splice(index, 0, value);
    this.parent.children.splice(index, 0, left);
    this.parent.children.splice(index, 0, right);

    this.parent.insert(value, left, right);
  }
};

BTree.Node.prototype.hasRoomForPromotion = function() {
  return this.parent.keys.length < this.order;
};

BTree.Node.prototype.findIndexForInsertion = function(value) {
  var result;
  _.each(this.keys, function(element, index){
    if(value <  element){
      result = index;
      return;
    }
  });
  return result || this.keys[this.keys.length-1];
};
