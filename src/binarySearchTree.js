var BinarySearchTree = function(value){
	this.left = null;
	this.right = null;
	this.value = value;
};

BinarySearchTree.prototype.insert = function(value){
  if(value > this.value){
    if (this.right === null){
      this.right = new BinarySearchTree(value);
    } else {
       this.right.insert(value);
    }
  }
  else {
    if (this.left === null){
      this.left = new BinarySearchTree(value);
    } else {
      this.left.insert(value);
    }
  }
};

BinarySearchTree.prototype.contains = function(value){
  if(this.value !== value){
    if(value > this.value){
      if(this.right !== null){
       return this.right.contains(value);
      } else {
        return false;
      }
    } else {
      if(this.left!==null){
        return this.left.contains(value);
      } else {
        return false;
      }
    }
  } else {
    return true;
  }

};
BinarySearchTree.prototype.depthFirstLog = function(callback){
  this.value = callback(this.value);
  if(this.left !== null){
    this.left.depthFirstLog(callback);
  }
  if (this.right !==null) {
    this.right.depthFirstLog(callback);
  }
};
BinarySearchTree.prototype.breadthFirstLog = function(callback){
  var storage = [];
  storage.push(this);
  var caller = function(node){
    node.value = callback(node.value);
    if (node.left !== null){
      storage.push(node.left);
    }
    if (node.right !== null){
      storage.push(node.right);
    }
    storage.shift();
  };
  while (storage.length > 0){
    caller(storage[0]);
  }
};