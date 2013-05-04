var BTree = function(){
  this.rootNode = new BTreeNode(this);
};

BTree.prototype.insert = function(value) {
  var self = this.rootNode;
  self.insertOnSelf(value);
};

var BTreeNode = function(parent){
  this.maxKeys = 2;
  this.maxChildren = 3;
  this.keys = [];
  this.children = [];
  this.parent = parent;
};

BTreeNode.prototype.insertOnSelf = function(value){
  if (! _.contains(this.keys, value)){
    if (this.hasRoomForKey()){
      this.keys.push(value); //look at re-sorting
    } else if (this.isFullNoChildren()) {
      this.handlePromotion(value);
    } else {
      this.findPath(value).insertOnSelf(value);
    }
  }
};
BTreeNode.prototype.findPath = function(value){
  var self = this;
  var result;
  _.each(self.keys, function(element, index, collection){
    if(value <  element){
      result = self.children[index];
      return;
    }
  });
  return result || self.children[self.children.length-1];
 };
BTreeNode.prototype.hasRoomForKey = function(){
  return this.children.length === 0 && this.keys.length < this.maxKeys;
};
BTreeNode.prototype.isFullNoChildren = function(){
  return this.children.length === 0 && this.keys.length === this.maxKeys;
};

BTreeNode.prototype.handlePromotion = function(value){
  //debugger;
  this.keys.push(value);
  this.keys = _.sortBy(this.keys, function(item){
    return item;
  });
  var middleIndex = Math.floor(this.keys.length/2);
  var childBTreeOne = new BTreeNode(this);
  var childBTreeTwo = new BTreeNode(this);
  for(var i= 0; i < middleIndex; i++){
    childBTreeOne.insertOnSelf(this.keys[i]);
  }
  for (var j = this.keys.length-1; j > middleIndex; j--){
    childBTreeTwo.insertOnSelf(this.keys[j]);
  }
  this.explodeNode(this.keys[middleIndex], childBTreeOne, childBTreeTwo);
};
BTreeNode.prototype.explodeNode = function(value, childOne, childTwo){
  if(this.isRootNode()){
    var bTree = this.parent;
    bTree.rootNode = new BTreeNode(this.parent);
    bTree.rootNode.insertOnSelf(value);
    bTree.rootNode.children.push(childOne);
    bTree.rootNode.children.push(childTwo);
  } else if (this.parent.hasRoomForPromotion()) {
    // var index = this.parent.findIndexForInsertion(value);
    // this.parent.keys[index] = value;
    // this.parent.children[index] = childOne;
    // this.parent.children[index] = childTwo;
  }
};
BTreeNode.prototype.isRootNode = function(){
  return !!this.parent.rootNode;
};
BTreeNode.prototype.hasRoomForPromotion = function() {
  return this.keys.length < this.maxKeys;
};
BTreeNode.prototype.findIndexForInsertion = function() {
  // var self = this;
  // var result;
  // _.each(self.keys, function(element, index, collection){
  //   if(value <  element){
  //     result = index;
  //     return;
  //   }
  // });
  // return result || self.keys[self.keys.length-1];
};


