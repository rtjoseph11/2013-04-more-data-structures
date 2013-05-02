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

treeMethods.contains = function(value){
  result = false;
  rSearch = function(context){
    if (context.value === value){
    result = true;
    } else if (context.children !== undefined && context.children.length){
    _.each(context.children,function(item){
      if(!result){
        rSearch(item);
      }
    });
  }
  };
  rSearch(this);
  return result;
};
treeMethods.traverse = function(callback){
  var self = this;
  self.value = callback(self.value);
  _.each(self.children, function(element){
    element.traverse(callback);
  });
};