var makeDoublyLinkedList = function(){
  var newLinkedList = {};
  newLinkedList.head = null;
  newLinkedList.tail = null;

  newLinkedList.addToTail = function(value){
    var node = makeDoubleLinkNode(value);
    if (newLinkedList.tail !== null){
      var prevTail = newLinkedList.tail;
      node.next = prevTail;
      prevTail.previous = node;
      newLinkedList.tail = node;
    }
    if (newLinkedList.head === null){
      newLinkedList.head = node;
      newLinkedList.tail = node;
    }
  };
  newLinkedList.addToHead = function(value){
    var node = makeDoubleLinkNode(value);
    node.previous = newLinkedList.head;
    if(newLinkedList.head !== null){
      newLinkedList.head.next = node;
    }
    newLinkedList.head = node;
    if (newLinkedList.tail === null){
      newLinkedList.tail = node;
    }
  };
  newLinkedList.removeFromHead = function(){
    if (newLinkedList.head !== null){
      var rtnNode = newLinkedList.head;
      newLinkedList.head = rtnNode.previous;
      if (newLinkedList.head !== null){
        newLinkedList.head.next = null;
      }
      return rtnNode.value;
    }
    else {
      return null;
    }
  };
  newLinkedList.removeFromTail = function(){
    var rtnNode = newLinkedList.tail;
    var newTail = newLinkedList.tail.next;
    newLinkedList.tail = newTail;
    newLinkedList.tail.previous = null;
    return rtnNode.value;
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

var makeDoubleLinkNode = function(value){
  var newNode = {};
  newNode.value = value;
  newNode.next = null;
  newNode.previous = null;
  newNode.removeNextNode = function(){};
  return newNode;
};