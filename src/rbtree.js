var RBTree = function(value){
  this.color = 'black';
  this.value = value;
  this.left = null;
  this.right = null;
  this.parent = null;
};

RBTree.prototype.insert = function(value){
  if(value < this.value){
    if(this.left){
      this.left.insert(value);
    } else {
      this.left = new RBTree(value);
      this.left.parent = this;
      this.left.color = 'red';
      this.left.balanceCase1();
    }
  } else {
    if(this.right){
      this.right.insert(value);
    } else {
      this.right = new RBTree(value);
      this.right.parent = this;
      this.right.color = 'red';
      this.right.balanceCase1();
    }
  }
};

RBTree.prototype.contains = function(value){
  if(this.value === value){
    return true;
  } else if(value < this.value && this.left){
    this.left.contains(value);
  } else if(this.right){
    this.right.contains(value);
  } else {
    return false;
  }
};

RBTree.prototype.grandParent = function(){
  return this.parent ? this.parent.parent : null;
};

RBTree.prototype.uncle = function(){
  if(this.grandParent()){
    if (this.parent === this.grandParent().left){
      return this.grandParent().right;
    } else {
      return this.grandParent().left;
    }
  }else{
    return null;
  }
};

RBTree.prototype.balanceCase1 = function(){
  return !this.parent ? this.color = 'black' : this.balanceCase2();
};

RBTree.prototype.balanceCase2 = function(){
  return this.parent.color === 'black' ? undefined : this.balanceCase3();
};

RBTree.prototype.balanceCase3 = function(){
  var uncle = this.uncle();
  if(uncle && uncle.color === 'red'){
    this.parent.color = 'black';
    uncle.color = 'black';
    this.grandParent().color = 'red';
    this.grandParent().balanceCase1();
  } else {
    this.balanceCase4();
  }
};

RBTree.prototype.balanceCase4 = function(){
  var grandParent = this.grandParent();
  var node = this;
  if(this === this.parent.right && this.parent === grandParent.left){
    this.parent.rotateLeft();
    node = this.left;
  } else if(this === this.parent.left && this.parent === grandParent.right){
    this.parent.rotateRight();
    node = this.right;
  }
  node.balanceCase5();
};

RBTree.prototype.balanceCase5 = function(){
  this.parent.color = 'black';
  this.grandParent().color = 'red';
  return this === this.parent.left ? this.grandParent().rotateRight() : this.grandParent().rotateLeft();
};

RBTree.prototype.rotateRight = function(){
  var pivot = this.left;
  pivot.parent = this.parent;
  if(this.parent && this.parent.left === this){//for the root node you dont need to set this
    this.parent.left = pivot;
  } else if(this.parent){
    this.parent.right = pivot;
  }
  this.left = pivot.right;
  pivot.right = this;
  this.parent = pivot;
};

RBTree.prototype.rotateLeft = function(){
  var pivot = this.right;
  pivot.parent = this.parent;
  if(this.parent && this.parent.left === this){//for the root node you dont need to set this
    this.parent.left = pivot;
  } else if(this.parent){
    this.parent.right = pivot;
  }
  this.right = pivot.left;
  pivot.left = this;
  this.parent = pivot;
};