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
  this.order = 2;
  this.keys = array || [];
  this.children = [];
  this.parent = undefined;
  this.MIN_LENGTH = 1;
};

BTree.Node.prototype.remove = function(value){
  if(this.children.length !== 0){ //not a leaf
    var target = this.findNode(value); //x
    var targetNode = target["node"];
    var targetIndex = target["key"];
    var leftSibling = targetNode.getLeftSibling(value);
    var rightSibling = targetNode.getRightSibling(value);
    if (targetNode.keys.length > this.MIN_LENGTH){
      return targetNode.remove(value);
    } else if (leftSibling.keys.length > this.MIN_LENGTH) {
      targetNode.keys.push(this.keys[targetIndex-1]);
      this.keys[targetIndex-1] = leftSibling.keys[leftSibling.keys.length-1];
      leftSibling.keys.splice(leftSibling.keys.length-1,1);
      targetNode.remove(value);
    } else if (rightSibling.keys.length > this.MIN_LENGTH){
      targetNode.keys.push(this.keys[targetIndex]);
      this.keys[targetIndex] = rightSibling.keys[0];
      rightSibling.keys.splice(0,1);
      targetNode.remove(value); //need to refactor to handle children
    } else { // merge case
      if (targetIndex === this.keys.length){ //merge with left sibling
        
      } else { 
        this.mergeNodes(targetNode,rightSibling,this.keys[targetIndex]);
        this.keys.splice(targetIndex,1);
        this.children.splice(targetIndex+1,1);
        targetNode.remove(value);
      }
    }
  } else {//leaf node
    if (this.keys.length > this.MIN_LENGTH-1){ //full leaf node
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
  left.children.concat(right.children);
};

BTree.Node.prototype.getRightSibling = function(value){
    var index = _(this.parent.keys).reduce(function(memo, key, index){
    return memo || value < key && index;
  },null,this); //this is the right side parent index
  if(index !== null && this.parent.children[index + 1]){
    return this.parent.children[index + 1];
  }
};
BTree.Node.prototype.getLeftSibling = function(value){
  var index = _(this.parent.keys).reduce(function(memo, key, index){
    return memo || value < key && index;
    },null,this); //this is the right side parent index
  if(index !== null && this.parent.children[index - 1]){
      return this.parent.children[index - 1];
  } else {
    return this.parent.children[this.parent.keys.length - 1];
  }
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
    this.findNode(value)['node'].insert(value);
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
      _.each(left.children, function(item){
        item.parent = left;
      },this);
      right.children = this.children.slice(middle+1);
      _.each(right.children,function(item){
        item.parent = right;
      },this);
      this.promoteValue(
        this.keys[middle],
        left,
        right
      );
    }
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
