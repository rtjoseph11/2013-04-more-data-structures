var BTree = function(){
  this.root = new BTree.Node();
  this.root.bTree = this;
};

BTree.prototype.insert = function(value) {
  this.root.insert(value);
};

BTree.Node = function(array){
  this.order = 2;
  this.keys = array || [];
  this.children = [];
  this.parent = undefined;
};

BTree.Node.prototype.insert = function(value, left, right){
  if (_.contains(this.keys, value)) { throw new Error('not allowing duplicate values'); }

  if(this.children.length && !(left || right)){
    this.findNode(value).insert(value);
  } else {
      this.keys = _(this.keys.concat([value])).sortBy(function(item){
        return item;
      });
      if(left && right){this.children = _(_(this.children).reject(function(child){
        return _(child.keys).contains(value);
        }).concat([left, right])).sortBy(function(child){
        return child.keys[0];
        });
      }
    if (this.order < this.keys.length) {
      var middle = Math.floor(this.keys.length/2);
      this.promoteValue(
        this.keys[middle],
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
  if(this.bTree){
    this.bTree.root = new BTree.Node([value]);
    this.bTree.root.bTree = this.bTree;
    this.bTree.root.children.push(left);
    this.bTree.root.children.push(right);
    left.parent = this.bTree.root;
    right.parent = this.bTree.root;
    delete this.bTree;
  } else if (this.parent.hasRoomForPromotion()) {
    this.parent.insert(value, left, right);
  }
};

BTree.Node.prototype.hasRoomForPromotion = function() {
  return this.keys.length < this.order;
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
