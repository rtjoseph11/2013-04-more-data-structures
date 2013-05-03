describe("B-Tree", function() {
  var btree;
  beforeEach(function() {
    btree = new BTree();
  });

  it("should have keys", function() {
    expect(Object.keys(btree)).toContain("parent");
    expect(Object.keys(btree)).toContain("maxKeys");
    expect(Object.keys(btree)).toContain("maxChildren");
    expect(Object.keys(btree)).toContain("keys");
    expect(Object.keys(btree)).toContain("children");

  });
  it("should have methods'", function() {
    expect(btree.insert).toEqual(jasmine.any(Function));
  });

  describe("#insert", function(){
    beforeEach(function(){
      btree.insert(1);
    });
    it("should insert a value", function(){
      expect(_.contains(btree.keys,1)).toEqual(true);
    });
    it('should insert another value',function(){
      btree.insert(2);
      expect(_.contains(btree.keys,1)).toEqual(true);
      expect(_.contains(btree.keys,2)).toEqual(true);
    });
    it('should autobalance when the root node is full', function(){
      btree.insert(2);
      btree.insert(3);
      expect(_.contains(btree.keys,1)).toEqual(false);
      expect(_.contains(btree.keys,2)).toEqual(true);
      expect(_.contains(btree.keys,3)).toEqual(false);
      expect(_.contains(btree.children[0].keys, 1)).toEqual(true);
      expect(_.contains(btree.children[1].keys, 3)).toEqual(true);
    });
    it('should add into second level nodes', function(){
      btree.insert(2);
      btree.insert(3);
      btree.insert(4);
      expect(_.contains(btree.children[1].keys, 4)).toEqual(true);
    });
  describe('autobalancing', function(){
    beforeEach(function(){
      btree.insert(1);
      btree.insert(2);
      btree.insert(3);
      btree.insert(4);
    });
    it('should promote correctly when child nodes are fully saturated', function(){
      btree.insert(5);
      expect(_.contains(btree.keys,2)).toEqual(true);
      expect(_.contains(btree.keys,4)).toEqual(true);
      expect(_.contains(btree.children[0].keys, 1)).toEqual(true);
      expect(_.contains(btree.children[1].keys, 3)).toEqual(true);
      expect(_.contains(btree.children[2].keys, 5)).toEqual(true);
    });
    it('should insert to the correct child', function(){
      btree.insert(5);
      btree.insert(6);
      expect(_.contains(btree.keys,2)).toEqual(true);
      expect(_.contains(btree.keys,4)).toEqual(true);
      expect(_.contains(btree.children[0].keys, 1)).toEqual(true);
      expect(_.contains(btree.children[1].keys, 3)).toEqual(true);
      expect(_.contains(btree.children[2].keys, 5)).toEqual(true);
      expect(_.contains(btree.children[2].keys, 6)).toEqual(true);
    });
    it('should rebalance the full tree', function(){
      btree.insert(5);
      btree.insert(6);
      btree.insert(7);
      expect(_.contains(btree.keys,2)).toEqual(false);
      expect(_.contains(btree.keys,4)).toEqual(true);
      expect(_.contains(btree.children[0].keys, 2)).toEqual(true);
      expect(_.contains(btree.children[1].keys, 6)).toEqual(true);
      expect(_.contains(btree.children[0].children[0].keys, 1)).toEqual(true);
      expect(_.contains(btree.children[0].children[1].keys, 3)).toEqual(true);
      expect(_.contains(btree.children[1].children[0].keys, 5)).toEqual(true);
      expect(_.contains(btree.children[1].children[1].keys, 7)).toEqual(true);
    });
  });
  });

});
