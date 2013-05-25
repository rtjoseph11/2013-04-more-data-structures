describe("binarySearchTree", function() {
  var rbTree;
  beforeEach(function() {
    rbTree = new RBTree(13);
  });
  describe('#insert',function(){
    it('should insert into the left branch', function(){
      rbTree.insert(8);
      expect(rbTree.color).toEqual('black');
      expect(rbTree.value).toEqual(13);
      expect(rbTree.left.color).toEqual('red');
      expect(rbTree.left.value).toEqual(8);
      expect(rbTree.left.parent).toEqual(rbTree);
      expect(rbTree.right).toEqual(null);
    });
    it('should insert into the right branch', function(){
      rbTree.insert(8);
      rbTree.insert(15);
      expect(rbTree.color).toEqual('black');
      expect(rbTree.value).toEqual(13);
      expect(rbTree.left.color).toEqual('red');
      expect(rbTree.left.value).toEqual(8);
      expect(rbTree.left.parent).toEqual(rbTree);
      expect(rbTree.right.color).toEqual('red');
      expect(rbTree.right.value).toEqual(15);
      expect(rbTree.right.parent).toEqual(rbTree);
    });
    it('should rotate when the left tree is unbalanced', function(){
      rbTree.insert(20);
      rbTree.insert(5);
      rbTree.insert(2);
      rbTree.insert(4);
      expect(rbTree.color).toEqual('black');
      expect(rbTree.value).toEqual(13);
      expect(rbTree.right.color).toEqual('black');
      expect(rbTree.right.value).toEqual(20);
      expect(rbTree.right.parent).toEqual(rbTree);
      expect(rbTree.left.color).toEqual('black');
      expect(rbTree.left.value).toEqual(4);
      expect(rbTree.left.parent).toEqual(rbTree);
      expect(rbTree.left.left.color).toEqual('red');
      expect(rbTree.left.left.value).toEqual(2);
      expect(rbTree.left.left.parent).toEqual(rbTree.left);
      expect(rbTree.left.right.color).toEqual('red');
      expect(rbTree.left.right.value).toEqual(5);
      expect(rbTree.left.right.parent).toEqual(rbTree.left);
    });
    it('should rotate when the right tree is unbalanced', function(){
      rbTree.insert(5);
      rbTree.insert(20);
      rbTree.insert(25);
      rbTree.insert(22);
      expect(rbTree.color).toEqual('black');
      expect(rbTree.value).toEqual(13);
      expect(rbTree.right.color).toEqual('black');
      expect(rbTree.right.value).toEqual(22);
      expect(rbTree.right.parent).toEqual(rbTree);
      expect(rbTree.left.color).toEqual('black');
      expect(rbTree.left.value).toEqual(5);
      expect(rbTree.left.parent).toEqual(rbTree);
      expect(rbTree.right.left.color).toEqual('red');
      expect(rbTree.right.left.value).toEqual(20);
      expect(rbTree.right.left.parent).toEqual(rbTree.right);
      expect(rbTree.right.right.color).toEqual('red');
      expect(rbTree.right.right.value).toEqual(25);
      expect(rbTree.right.right.parent).toEqual(rbTree.right);
    });
  });
});