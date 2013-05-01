describe("parentTree", function() {
  var parentTree;

  beforeEach(function() {
    parentTree = makeParentTree('rootNode');
    parentTree.addChild('a');
    parentTree.addChild('b');
    parentTree.addChild('c');
    for (var i = 0; i < parentTree.children.length; i++){
      parentTree.children[i].addChild('deep' + i);
    }
    parentTree.children[0].children[0].addChild('reallydeep0');
  });
  it("should have methods named 'addChild' and 'contains', and a property named 'value'", function() {
    expect(parentTree.addChild).toEqual(jasmine.any(Function));
    expect(parentTree.contains).toEqual(jasmine.any(Function));
    expect(parentTree.removeFromParent).toEqual(jasmine.any(Function));
    expect('value' in parentTree).toEqual(true);
    expect('parent' in parentTree).toEqual(true);
    expect('children' in parentTree).toEqual(true);
  });
  describe("#addChild", function(){
    it("should add a child node", function(){
      expect(parentTree.children[0].value).toEqual("a");
    });
    it("should add children that point to the parent", function(){
      expect(parentTree.children[0].parent).toEqual(parentTree);
      expect(parentTree.children[1].parent).toEqual(parentTree);
      expect(parentTree.children[2].parent).toEqual(parentTree);
    });
  });
  describe("#removeFromParent", function(){
    var removedNode;
    beforeEach(function(){
      removedNode = parentTree.children[1].removeFromParent();
    });
    it("should have its parent property set to null", function(){
      expect(removedNode.parent).toEqual(null);
    });
    it("shold not be pointed to by the parent", function(){
      expect(parentTree.contains('b')).toEqual(false);
      expect(parentTree.contains('deep1')).toEqual(false);
    });
    it("should not remove other parent-child relationships", function(){
      expect(parentTree.contains('a')).toEqual(true);
      expect(parentTree.contains('reallydeep0')).toEqual(true);
    });
    it("should return a new tree", function(){
      var orphanTree = parentTree.children[0].removeFromParent();
      expect(orphanTree.value).toEqual('a');
      expect(orphanTree.contains('reallydeep0')).toEqual(true);
    });
  });
  describe("#contains()",function(){
    it('should contain a root value', function(){
      expect(parentTree.contains('rootNode')).toEqual(true);
      expect(parentTree.contains('a')).toEqual(true);
      expect(parentTree.contains('b')).toEqual(true);
      expect(parentTree.contains('c')).toEqual(true);
      expect(parentTree.contains('d')).toEqual(false);
      expect(parentTree.contains('deep1')).toEqual(true);
      expect(parentTree.contains('reallydeep0')).toEqual(true);
    });
  });
});