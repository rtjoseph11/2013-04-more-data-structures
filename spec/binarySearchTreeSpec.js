describe("binarySearchTree", function() {
  var binarySearchTree;

  beforeEach(function() {
    binarySearchTree = new BinarySearchTree(10);
  });

  it("should have methods named 'insert', 'contains', and 'depthFirstLog", function() {
    expect(binarySearchTree.insert).toEqual(jasmine.any(Function));
    expect(binarySearchTree.contains).toEqual(jasmine.any(Function));
    expect(binarySearchTree.depthFirstLog).toEqual(jasmine.any(Function));
  });
  describe("#insert", function(){
    it("should insert a value", function(){
      binarySearchTree.insert(3);
      expect(binarySearchTree.left.value).toEqual(3);
    });
    it("should insert values on the left and right of an element", function(){
      binarySearchTree.insert(3);
      binarySearchTree.insert(30);
      expect(binarySearchTree.left.value).toEqual(3);
      expect(binarySearchTree.right.value).toEqual(30);
    });
    it("should insert multiple levels deep in the tree",function(){
      binarySearchTree.insert(3);
      binarySearchTree.insert(30);
      binarySearchTree.insert(7);
      binarySearchTree.insert(1);
      binarySearchTree.insert(2);
      expect(binarySearchTree.left.value).toEqual(3);
      expect(binarySearchTree.right.value).toEqual(30);
      expect(binarySearchTree.left.right.value).toEqual(7);
      expect(binarySearchTree.left.left.right.value).toEqual(2);
    });
    it("should maintain the maximum depth", function(){
      expect(binarySearchTree.maxDepth).toEqual(1);
      binarySearchTree.insert(3);
      expect(binarySearchTree.maxDepth).toEqual(2);
      binarySearchTree.insert(30);
      expect(binarySearchTree.maxDepth).toEqual(2);
      binarySearchTree.insert(7);
      expect(binarySearchTree.maxDepth).toEqual(3);
    });
    it("should maintain the minimum depth", function(){
      expect(binarySearchTree.minDepth).toEqual(1);
      binarySearchTree.insert(3);
      expect(binarySearchTree.minDepth).toEqual(2);
      binarySearchTree.insert(30);
      expect(binarySearchTree.minDepth).toEqual(2);
      binarySearchTree.insert(7);
      expect(binarySearchTree.minDepth).toEqual(2);
      binarySearchTree.insert(50);
      expect(binarySearchTree.minDepth).toEqual(3);
    });
  });
  describe("#contains", function(){
    beforeEach(function(){
      binarySearchTree.insert(3);
      binarySearchTree.insert(30);
      binarySearchTree.insert(7);
      binarySearchTree.insert(1);
      binarySearchTree.insert(2);
      binarySearchTree.insert(50);
    });
    it("should return true for values in the tree", function(){
      expect(binarySearchTree.contains(3)).toEqual(true);
      expect(binarySearchTree.contains(30)).toEqual(true);
      expect(binarySearchTree.contains(7)).toEqual(true);
      expect(binarySearchTree.contains(1)).toEqual(true);
      expect(binarySearchTree.contains(2)).toEqual(true);
      expect(binarySearchTree.contains(50)).toEqual(true);
    });
    it("should return false for values not in the tree", function(){
      expect(binarySearchTree.contains(90)).toEqual(false);
      expect(binarySearchTree.contains(-1)).toEqual(false);
    });
  });
  describe("#depthFirstLog", function(){
    beforeEach(function(){
      binarySearchTree.insert(3);
      binarySearchTree.insert(30);
      binarySearchTree.insert(7);
      binarySearchTree.insert(1);
      binarySearchTree.insert(2);
      binarySearchTree.insert(50);
    });
    it("should execute the callback on each element in the tree", function(){
      binarySearchTree.depthFirstLog(function(value){
        return value * 2;
      });
      expect(binarySearchTree.contains(6)).toEqual(true);
      expect(binarySearchTree.contains(60)).toEqual(true);
      expect(binarySearchTree.contains(14)).toEqual(true);
      expect(binarySearchTree.contains(2)).toEqual(true);
      expect(binarySearchTree.contains(4)).toEqual(true);
      expect(binarySearchTree.contains(100)).toEqual(true);
    });
  });
  describe("#breadthFirstLog", function(){
    beforeEach(function(){
      binarySearchTree.insert(3);
      binarySearchTree.insert(30);
      binarySearchTree.insert(7);
      binarySearchTree.insert(1);
      binarySearchTree.insert(2);
      binarySearchTree.insert(50);
    });
    it("should execute the callback on each element in the tree", function(){
      binarySearchTree.breadthFirstLog(function(value){
        return value * 2;
      });
      expect(binarySearchTree.contains(6)).toEqual(true);
      expect(binarySearchTree.contains(60)).toEqual(true);
      expect(binarySearchTree.contains(14)).toEqual(true);
      expect(binarySearchTree.contains(2)).toEqual(true);
      expect(binarySearchTree.contains(4)).toEqual(true);
      expect(binarySearchTree.contains(100)).toEqual(true);
    });
  });
  describe("#rebalance", function(){
    beforeEach(function(){
      binarySearchTree.insert(3);
      binarySearchTree.insert(30);
      binarySearchTree.insert(7);
      binarySearchTree.insert(6);
      binarySearchTree.insert(5);
    });
    it("should rebalance the tree", function(){
      expect(binarySearchTree.maxDepth).not.toEqual(5);
    });
    it("should recreate a balanced tree", function(){
      //expect(false).toEqual(true);
    });
    it("should contain all elements after rebalancing", function(){
      expect(binarySearchTree.contains(3)).toEqual(true);
      expect(binarySearchTree.contains(30)).toEqual(true);
      expect(binarySearchTree.contains(7)).toEqual(true);
      expect(binarySearchTree.contains(6)).toEqual(true);
      expect(binarySearchTree.contains(5)).toEqual(true);
    });
  });
});