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
    

    expect(parentTree.children[0].value).toEqual("a");
  });

});