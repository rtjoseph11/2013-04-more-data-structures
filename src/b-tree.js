var BTree = function(parent){
  this.maxKeys = 2;
  this.maxChildren = 3;
  this.keys = [];
  this.children = [];
  this.parent = parent;
};

BTree.prototype.insert = function(value) {
  var self = this;
  //start all insertions at a leaf node
  if (self.children.length === 0 && self.keys.length < self.maxKeys){
    self.keys.push(value);
    self.keys = _.sortBy(self.keys, function(item){
    return item;
  });
  } else if (self.children.length === 0 && self.keys.length === self.maxKeys) {
    self.handlePromotion(value);
  } else {
    self.insertElementBelowNode(value);
  }
};

//insert below element
BTree.prototype.insertElementBelowNode = function(value){
  var context = this;
  _.each(context.keys, function(element, index, collection){
    if(value <  element){
      context.children[index].insert(value);
    } else if (value === element) {
      return;
    } else if (index === collection.length-1){
      context.children[index + 1].insert(value);
    }
  });
 };

BTree.prototype.handlePromotion = function(value){
  var context = this;
  var values = [];
  values.push(value);
  _.each(this.keys, function(item){
    values.push(item);
  });
  values = _.sortBy(values, function(item){
    return item;
  });
  var middleIndex = Math.floor(values.length/2);
  var childBTreeOne = new BTree(context);
  var childBTreeTwo = new BTree(context);
  for(var i= 0; i < middleIndex; i++){
    childBTreeOne.insert(values[i]);
  }
  for (var j = values.length-1; j > middleIndex; j--){
    childBTreeTwo.insert(values[j]);
  }
  context.keys = [values[middleIndex]];
  context.children.push(childBTreeOne);
  context.children.push(childBTreeTwo);
};