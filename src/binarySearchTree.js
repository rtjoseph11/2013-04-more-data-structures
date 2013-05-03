var BinarySearchTree = function(value){
	this.left = null;
	this.right = null;
	this.value = value;
  this.minDepth = 1;
  this.maxDepth = 1;
};

BinarySearchTree.prototype.insert = function(value){
  var root = this;
  var depth = 0;
  var insertHelper = function(context){
    depth++;
    if(value > context.value){
      if (context.right === null){
        context.right = new BinarySearchTree(value);
        depth++;
      } else {
         insertHelper(context.right);
      }
    }
    else {
      if (context.left === null){
        context.left = new BinarySearchTree(value);
        depth++;
      } else {
        insertHelper(context.left);
      }
    }
  };
  insertHelper(this);
  if (root.maxDepth < depth){
    root.maxDepth = depth;
  }
  this.setMinDepth();
  if (root.minDepth*2 < root.maxDepth){
    root.rebalance();
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
BinarySearchTree.prototype.setMinDepth = function() {
  var storage = [];
  var depth = 1;
  var hitMinDepth = false;
  storage.push([this, depth]);
  var checker = function(tuple){
    var node = tuple[0];
    var currDepth = tuple[1];
    if (node.left !== null){
      storage.push([node.left, currDepth + 1]);
    }
    if(node.right !== null){
      storage.push([node.right, currDepth + 1]);
    }
    if (node.right === null && node.left === null){
      depth = currDepth;
      hitMinDepth = true;
    }
    storage.shift();
  };
  while (!hitMinDepth){
    checker(storage[0]);
  }
  this.minDepth = depth;
};

BinarySearchTree.prototype.rebalance = function(){
  var storageArray = [];
  this.depthFirstLog(function(value){
    storageArray.push(value);
  });
  storageArray = _.sortBy(storageArray, function(item){
    return item;
  });
  var index = Math.floor(storageArray.length/2);
  var self = this;
  self.value = storageArray[index];
  storageArray.splice(index,1);
  self.left = null;
  storageArray = _.sortBy(storageArray, function(item){
    return Math.abs(item-self.value);
  });
  self.right = null;
  self.minDepth = 1;
  self.maxDepth = 1;
  _.each(storageArray,function(item){
    self.insert(item);
  });
};