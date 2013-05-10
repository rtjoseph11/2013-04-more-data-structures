var BTree = function(){
  this.root = new BTree.Node();
  this.root.bTree = this;
};

BTree.prototype.insert = function(value) {
  this.root.insert(value);
};
BTree.prototype.contains = function(value){
  return this.root.contains(value);
};

BTree.Node = function(array){
  this.order = 2;
  this.keys = array || [];
  this.children = [];
  this.parent = undefined;
};

BTree.Node.prototype.contains = function(value) {
  if (_(this.keys).contains(value)){
    return true;
  } else if (this.children.length > 0){
    for (var i = 0; i < this.keys.length; i ++){
      if (this.keys[i] > value){
        return this.children[i].contains(value);
      }
    }
    return this.children[this.children.length-1].contains(value);
  } else {
    return false;
  }
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
      left = new BTree.Node(this.keys.slice(0, middle));
      right = new BTree.Node(this.keys.slice(middle+1));
      left.children = this.children.slice(0,middle+1);
      _(left.children).each(function(child){
        child.parent = left;
      });
      right.children = this.children.slice(middle+1);
      _(right.children).each(function(child){
        child.parent = right;
      });
      this.promoteValue(
        this.keys[middle],
        left,
        right
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
  } else {
    left.parent = this.parent;
    right.parent = this.parent;
    this.parent.insert(value, left, right);
  }
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
