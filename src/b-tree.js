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
BTree.prototype.remove = function(value){
  return this.root.remove(value);
};
BTree.Node = function(array){
  this.order = 2; //min keys = 1, max keys = 3, max children
  this.keys = array || [];
  this.children = [];
  this.parent = undefined;
};

BTree.Node.prototype.remove = function(value){
  if (_.contains(this.keys, value) && this.children.length !== 0){
    var keyIndex = _.indexOf(this.keys,value,true);
    var leftChild = this.children[keyIndex];
    var rightChild = this.children[keyIndex+1];
    if (leftChild.keys.length > this.order - 1){
      this.keys[keyIndex] = _.last(leftChild.keys);
      leftChild.remove(_.last(leftChild.keys));
    } else if (rightChild.keys.length > this.order - 1){
      this.keys[keyIndex] = _.first(rightChild.keys);
      rightChild.remove(_.first(rightChild.keys));
    } else {//handle merge case for internal nodes
      this.mergeNodes(leftChild,rightChild,this.keys[keyIndex]);
      this.keys.splice(keyIndex,1);
      this.children.splice(keyIndex+1,1);
      leftChild.remove(value);
    }
  } else if(this.children.length !== 0){ //not a leaf
    var target = this.findNode(value);
    var targetNode = target["node"];
    var targetIndex = target["key"];
    var leftSibling = this.targetLeftSibling(targetIndex);
    var rightSibling = this.targetRightSibling(targetIndex);
    if (targetNode.keys.length > this.order - 1){
      return targetNode.remove(value);
    } else if (leftSibling && leftSibling.keys.length > this.order - 1) {
      targetNode.keys.push(this.keys[targetIndex-1]);
      this.keys[targetIndex-1] = leftSibling.keys[leftSibling.keys.length-1];
      if(_.last(leftSibling.children)){
        _.last(leftSibling.children).parent = targetNode;
        targetNode.children.unshift(_.last(leftSibling.children));
        leftSibling.children.pop();
      }
      leftSibling.keys.splice(leftSibling.keys.length-1,1);
      targetNode.remove(value);
    } else if (rightSibling && rightSibling.keys.length > this.order - 1){
      targetNode.keys.push(this.keys[targetIndex]);
      this.keys[targetIndex] = rightSibling.keys[0];
      if (_.first(rightSibling.children)) {
        _.first(rightSibling.children).parent = targetNode;
        targetNode.children.push(_.first(rightSibling.children));
        rightSibling.children.shift();
      }
      rightSibling.keys.splice(0,1);
      targetNode.remove(value);
    } else { // merge case
      if (targetIndex === this.keys.length){ //merge with left sibling
        this.mergeNodes(leftSibling,targetNode,this.keys[targetIndex-1]);
        this.keys.splice(targetIndex-1,1);
        this.children.splice(targetIndex,1);
        targetNode.remove(value);
      } else { //merge with right sibling
        this.mergeNodes(targetNode,rightSibling,this.keys[targetIndex]);
        this.keys.splice(targetIndex,1);
        this.children.splice(targetIndex+1,1);
        targetNode.remove(value);
      }
    }
  } else {//leaf node
    if (this.keys.length > this.order - 1-1){ //full leaf node
      this.keys = _(this.keys).reject(function(key){ return key === value;});
      return value;
    }
  }
};

BTree.Node.prototype.mergeNodes = function(left,right,value){
  left.keys.push(value);
  left.keys = left.keys.concat(right.keys);
  _.each(right.children,function(item){
    item.parent = left;
  });
  left.children = left.children.concat(right.children);
};

BTree.Node.prototype.targetRightSibling = function(index){
  return this.children[index+1] ? this.children[index +1] : null;
};
BTree.Node.prototype.targetLeftSibling = function(index){
  return this.children[index-1] ? this.children[index-1] : null;
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

BTree.Node.prototype.insert = function(value){
  if (_.contains(this.keys, value)) { throw new Error('not allowing duplicate values'); }

  if (this.bTree && (this.keys.length >= 2 * this.order - 1)){ //root node
    this.bTree.root = new BTree.Node();
    this.bTree.root.bTree = this.bTree;
    var middle = Math.floor(this.keys.length/2);
    var left = new BTree.Node(this.keys.slice(0,middle));
    var right = new BTree.Node(this.keys.slice(middle+1));
    left.children = this.children.slice(0,middle+1);
    left.parent = this.bTree.root;
    right.children = this.children.slice(middle+1);
    right.parent = this.bTree.root;
    _.each(left.children, function(item){
      item.parent = left;
    },this);
    _.each(right.children,function(item){
      item.parent = right;
    },this);
    this.bTree.root.keys.push(this.keys[middle]);
    this.bTree.root.children = [left, right];
    this.bTree.root.findNode(value)['node'].insert(value);
  } else if(this.children.length){//not a leaf node
    var target = this.findNode(value);
    var targetNode = target['node'];
    var targetIndex = target['key'];
    if(targetNode.keys.length >= 2 * this.order - 1){  //target node full.  split node
      var middle = Math.floor(targetNode.keys.length/2);
      var left = new BTree.Node(targetNode.keys.slice(0,middle));
      var right = new BTree.Node(targetNode.keys.slice(middle+1));
      left.children = targetNode.children.slice(0,middle+1);
      left.parent = this;
      right.children = targetNode.children.slice(middle+1);
      right.parent = this;
      _.each(left.children, function(item){
        item.parent = left;
      },this);
      _.each(right.children,function(item){
        item.parent = right;
      },this);
      this.keys.splice(targetIndex,0,targetNode.keys[middle]);
      this.children.splice(targetIndex,1,left);
      this.children.splice(targetIndex + 1, 0, right);
      this.findNode(value)['node'].insert(value);
    } else {
      targetNode.insert(value);
    }
  } else {  //found a leaf node
      this.keys = _(this.keys.concat([value])).sortBy(function(item){
        return item;
      });
  }
};

BTree.Node.prototype.findNode = function(value){
  return _(this.keys).reduce(function(memo, key, index){
    return memo || value < key && {node:this.children[index],key:index};
  }, null,this) || {node:_(this.children).last(),key:this.children.length-1};
};

BTree.Node.prototype.findIndexInParent = function(){
  var index = _(this.parent.keys).reduce(function(foundInd, key, index){
    return foundInd || this.keys[0] < key && index;
  },null,this) || this.parent.children.length-1;
  return index;
};

BTree.Node.prototype.findSiblings = function(){
  var rtnArray = [];
  var value = this.keys[0];
  var children = this.parent.children;
  var index = _(this.parent.keys).reduce(function(childInd, key, index){
    return childInd || value < key && index;
  },null,this); //this is the right side parent index
  if (index && children[index+1]){
    rtnArray.push(children[index+1]);
  }
  if (index && children[index-1]){
    rtnArray.push(children[index-1]);
  }
  if (!index){
    rtnArray.push(children[this.parent.keys.length-1]);
  }
  return rtnArray;
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
