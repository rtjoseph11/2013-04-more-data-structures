describe("tree", function() {
  var tree;

  beforeEach(function() {
    tree = makeTree('rootNode');
    tree.addChild('a');
    tree.addChild('b');
    tree.addChild('c');
    for (var i = 0; i < tree.children.length; i++){
      tree.children[i].addChild('deep' + i);
    }
    tree.children[0].children[0].addChild('reallydeep0');

  });

  it("should have methods named 'addChild' and 'contains', and a property named 'value'", function() {
    expect(tree.addChild).toEqual(jasmine.any(Function));
    expect(tree.contains).toEqual(jasmine.any(Function));
    expect('value' in tree).toBe(true);
  });
  describe("#contains()",function(){
    it('should contain a root value', function(){
      expect(tree.contains('rootNode')).toEqual(true);
      expect(tree.contains('a')).toEqual(true);
      expect(tree.contains('b')).toEqual(true);
      expect(tree.contains('c')).toEqual(true);
      expect(tree.contains('d')).toEqual(false);
      expect(tree.contains('deep1')).toEqual(true);
      expect(tree.contains('reallydeep0')).toEqual(true);
    });
  });
  describe("#addChild()", function(){
    it('should add values to trees', function(){
      expect(tree.children[0].value).toEqual('a');
    });
  });
  describe('#makeTree()',function(){
    it('should add a tree',function(){
      expect(tree.value).toEqual('rootNode');
    });
  });

  // Add more tests here to test the functionality of tree.
});