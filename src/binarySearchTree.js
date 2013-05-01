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

};