var makeTree = function(value){
  var newTree = {};
  newTree.value = value;
  newTree.children = [];
  _.extend(newTree, treeMethods);
  return newTree;
};

var treeMethods = {};

treeMethods.addChild = function(value){
  var node = makeTree(value);
  this.children.push(node);
};

treeMethods.contains = function(value, result){
  result = result || false;
  if (this.value === value){
    result = true;
  }
  else if (this.children.length){
    _.each(children, function(item){
      if (!result){
        result = item.contains(value, result);
      }
    });
  }
  return result;
};
