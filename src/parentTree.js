var makeParentTree = function(value){
  var newParentTree = {};
  newParentTree.value = value;
  newParentTree.parent = null;
  newParentTree.children = [];
  _.extend(newParentTree, parentTreeMethods);
  return newParentTree;
};

var parentTreeMethods = {};

parentTreeMethods.addChild = function(value){
  var node = makeParentTree(value);
  node.parent = this;
  this.children.push(node);
};

parentTreeMethods.removeFromParent = function(){
  var testNode = this;
  if(testNode.parent !== null){
    _.each(testNode.parent.children, function(item, index){
      if(item === testNode){
        testNode.parent.children.splice(index, 1);
        return;
      }
    });
    testNode.parent = null;
    return testNode;
  }
};

parentTreeMethods.contains = function(value){
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