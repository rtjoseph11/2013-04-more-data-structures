// Note: don't use an array to do this.
var makeLinkedList = function(){
  var newLinkedList = {};
  newLinkedList.head = null;
  newLinkedList.tail = null;

  newLinkedList.addToTail = function(value){
    var node = makeNode(value);
    node.next = newLinkedList.tail;
    newLinkedList.tail = node;
    if (newLinkedList.head === null){
      newLinkedList.head = node;
    }
  };

  newLinkedList.removeHead = function(){
   var testNode = newLinkedList.tail;
   if (testNode.next === null){
    newLinkedList.head = null;
    newLinkedList.tail = null;
    return testNode.value;
   } else {
    while (testNode.next !== newLinkedList.head){
      testNode = testNode.next;
     }
     var rtn = testNode.removeNextNode();
     newLinkedList.head = testNode;
     return rtn;
   }
  };

  newLinkedList.contains = function(value){
    var testNode = newLinkedList.tail;
    while(testNode !== null){
      if(value === testNode.value){
        return true;
      }
    testNode = testNode.next;
    }
    return false;
  };

  return newLinkedList;
};

var makeNode = function(value){
  var newNode = {};
  newNode.value = value;
  newNode.next = null;

  newNode.removeNextNode = function(){
    var rtnVal = newNode.next.value;
    newNode.next = null;
    return rtnVal;
  };

  return newNode;
};
