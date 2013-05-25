describe("B-Tree", function() {
  var btree;
  beforeEach(function() {
    btree = new BTree();
  });

  describe("#insert", function(){
    beforeEach(function(){
      btree.insert(1);
    });
    it("should insert a value", function(){
      expect(_.contains(btree.root.keys,1)).toEqual(true);
    });
    it('should insert another value',function(){
      btree.insert(2);
      btree.insert(3);
      expect(_.contains(btree.root.keys,1)).toEqual(true);
      expect(_.contains(btree.root.keys,2)).toEqual(true);
      expect(_.contains(btree.root.keys,3)).toEqual(true);
    });
    it('should autobalance when the root node is full', function(){
      btree.insert(2);
      btree.insert(3);
      btree.insert(4);
      expect(_.contains(btree.root.keys,1)).toEqual(false);
      expect(_.contains(btree.root.keys,2)).toEqual(true);
      expect(_.contains(btree.root.keys,3)).toEqual(false);
      expect(_.contains(btree.root.children[0].keys, 1)).toEqual(true);
      expect(_.contains(btree.root.children[1].keys, 3)).toEqual(true);
      expect(_.contains(btree.root.children[1].keys, 4)).toEqual(true);

    });
    it('should add into second level nodes', function(){
      btree.insert(2);
      btree.insert(3);
      btree.insert(4);
      btree.insert(5);
      expect(_.contains(btree.root.children[1].keys, 3)).toEqual(true);
      expect(_.contains(btree.root.children[1].keys, 4)).toEqual(true);
      expect(_.contains(btree.root.children[1].keys, 5)).toEqual(true);
      expect(_.contains(btree.root.keys,2)).toEqual(true);
      expect(_.contains(btree.root.keys,3)).toEqual(false);
    });
    it('should have a parent node', function(){
      btree.insert(2);
      btree.insert(3);
      btree.insert(4);
      expect(btree.root.children[0].parent.keys[0]).toEqual(2);
      expect(btree.root.children[1].parent.keys[0]).toEqual(2);
    });
  describe('autobalancing', function(){
    beforeEach(function(){
      btree.insert(2);
      btree.insert(3);
      btree.insert(4);
    });
    it('should promote correctly when child nodes are fully saturated', function(){
      btree.insert(5);
      expect(_.contains(btree.root.keys,2)).toEqual(true);
      expect(_.contains(btree.root.keys,4)).toEqual(false);
      expect(_.contains(btree.root.children[0].keys, 1)).toEqual(true);
      expect(_.contains(btree.root.children[1].keys, 3)).toEqual(true);
      expect(_.contains(btree.root.children[1].keys, 4)).toEqual(true);
      expect(_.contains(btree.root.children[1].keys, 5)).toEqual(true);
    });
    it('should give promoted nodes a parent', function(){
      btree.insert(5);
      expect(btree.root.children[0].parent.keys[0]).toEqual(2);
      expect(btree.root.children[1].parent.keys[0]).toEqual(2);
    });
    it('should insert to the correct child', function(){
      btree.insert(5);
      btree.insert(6);
      expect(_.contains(btree.root.keys,2)).toEqual(true);
      expect(_.contains(btree.root.keys,4)).toEqual(true);
      expect(_.contains(btree.root.children[0].keys, 1)).toEqual(true);
      expect(_.contains(btree.root.children[1].keys, 3)).toEqual(true);
      expect(_.contains(btree.root.children[2].keys, 5)).toEqual(true);
      expect(_.contains(btree.root.children[2].keys, 6)).toEqual(true);
    });
    it('should rebalance the full tree', function(){
      btree.insert(5);
      btree.insert(6);
      btree.insert(7);
      btree.insert(8);
      btree.insert(9);
      expect(_.contains(btree.root.keys,4)).toEqual(true);
      expect(_.contains(btree.root.children[0].keys,2)).toEqual(true);
      expect(_.contains(btree.root.children[1].keys,6)).toEqual(true);
      expect(_.contains(btree.root.children[1].children[0].keys,5)).toEqual(true);
      expect(_.contains(btree.root.children[1].children[1].keys,7)).toEqual(true);
      expect(_.contains(btree.root.children[1].children[1].keys,8)).toEqual(true);
      expect(_.contains(btree.root.children[1].children[1].keys,9)).toEqual(true);
    });
    it('should rebalance the full tree part 2', function(){
      btree.insert(5);
      btree.insert(6);
      btree.insert(7);
      btree.insert(8);
      btree.insert(9);
      btree.insert(10);
      btree.insert(11);
      btree.insert(12);
      btree.insert(13);
      expect(_.contains(btree.root.keys,4)).toEqual(true);
      expect(_.contains(btree.root.keys,8)).toEqual(true);
      expect(_.contains(btree.root.children[0].keys, 2)).toEqual(true);
      expect(_.contains(btree.root.children[1].keys, 6)).toEqual(true);
      expect(_.contains(btree.root.children[2].keys, 10)).toEqual(true);
      expect(_.contains(btree.root.children[0].children[0].keys, 1)).toEqual(true);
      expect(_.contains(btree.root.children[0].children[1].keys, 3)).toEqual(true);
      expect(_.contains(btree.root.children[1].children[0].keys, 5)).toEqual(true);
      expect(_.contains(btree.root.children[1].children[1].keys, 7)).toEqual(true);
      expect(_.contains(btree.root.children[2].children[0].keys, 9)).toEqual(true);
      expect(_.contains(btree.root.children[2].children[1].keys, 11)).toEqual(true);
      expect(_.contains(btree.root.children[2].children[1].keys, 12)).toEqual(true);
      expect(_.contains(btree.root.children[2].children[1].keys, 13)).toEqual(true);
    });
  });
  });
  describe("#contains", function(){
    beforeEach(function(){
      btree.insert(0);
      btree.insert(1);
      btree.insert(2);
      btree.insert(3);
      btree.insert(4);
      btree.insert(5);
      btree.insert(6);
      btree.insert(7);
      btree.insert(8);
    });
    it('should contain inserted values', function(){
      expect(btree.contains(0)).toEqual(true);
      expect(btree.contains(1)).toEqual(true);
      expect(btree.contains(2)).toEqual(true);
      expect(btree.contains(3)).toEqual(true);
      expect(btree.contains(4)).toEqual(true);
      expect(btree.contains(5)).toEqual(true);
      expect(btree.contains(6)).toEqual(true);
      expect(btree.contains(7)).toEqual(true);
      expect(btree.contains(8)).toEqual(true);
    });
  });
  describe("#remove", function(){
    it('should remove an element from the root', function(){
      btree.insert(1);
      btree.insert(2);
      expect(btree.contains(1)).toEqual(true);
      btree.remove(1);
      expect(btree.contains(1)).toEqual(false);
    });
    describe('with a fully saturated leaf node', function(){
      beforeEach(function(){
        btree.insert(1);
        btree.insert(2);
        btree.insert(3);
        btree.insert(4);
      });
      it('should remove an element from the leaf node', function(){
        btree.remove(4);
        expect(_.contains(btree.root.keys,2)).toEqual(true);
        expect(_.contains(btree.root.children[0].keys,1)).toEqual(true);
        expect(_.contains(btree.root.children[1].keys,3)).toEqual(true);
        expect(_.contains(btree.root.children[1].keys,4)).toEqual(false);
      });
      it('should remove elements from a left side leaf node',function(){
        btree.insert(0);
        expect(_.contains(btree.root.children[0].keys,0)).toEqual(true);
        btree.remove(0);
        expect(_.contains(btree.root.children[0].keys,0)).toEqual(false);
        expect(_.contains(btree.root.children[0].keys,1)).toEqual(true);
        expect(_.contains(btree.root.children[1].keys,3)).toEqual(true);
        expect(_.contains(btree.root.children[1].keys,4)).toEqual(true);
        expect(_.contains(btree.root.keys,2)).toEqual(true);
      });
    });
    describe('target node has the minimum number of elements', function(){
      beforeEach(function(){
        btree.insert(1);
        btree.insert(2);
        btree.insert(3);
        btree.insert(4);
        btree.insert(5);
        btree.insert(6);
      });
      it('should rotate an element from right to left', function(){
        btree.remove(3);
        expect(btree.contains(3)).toEqual(false);
        expect(btree.root.children[1].keys[0]).toEqual(4);
        expect(btree.root.keys[0]).toEqual(2);
        expect(btree.root.keys[1]).toEqual(5);
        expect(btree.root.children[2].keys[0]).toEqual(6);
      });
      it('should rotate an element from left to right', function(){
        btree.insert(0);
        btree.remove(3);
        expect(btree.contains(3)).toEqual(false);
        expect(btree.root.children[1].keys[0]).toEqual(2);
        expect(btree.root.keys[0]).toEqual(1);
        expect(btree.root.children[0].keys[0]).toEqual(0);
      });
      it('should merge sparse center nodes', function(){
        btree.remove(6);
        btree.remove(3);
        expect(btree.root.keys[0]).toEqual(2);
        expect(btree.root.keys[1]).toEqual(undefined);
        expect(btree.root.children[0].keys[0]).toEqual(1);
        expect(btree.root.children[1].keys[0]).toEqual(4);
        expect(btree.root.children[1].keys[1]).toEqual(5);
      });
      it('should remove sparse right nodes', function(){
        btree.remove(6);
        btree.remove(5);
        expect(btree.root.keys[0]).toEqual(2);
        expect(btree.root.keys[1]).toEqual(undefined);
        expect(btree.root.children[0].keys[0]).toEqual(1);
        expect(btree.root.children[1].keys[0]).toEqual(3);
        expect(btree.root.children[1].keys[1]).toEqual(4);
      });
      it('should remove sparse left nodes', function(){
        btree.remove(6);
        btree.remove(1);
        expect(btree.root.keys[0]).toEqual(4);
        expect(btree.root.keys[1]).toEqual(undefined);
        expect(btree.root.children[0].keys[0]).toEqual(2);
        expect(btree.root.children[0].keys[1]).toEqual(3);
        expect(btree.root.children[1].keys[0]).toEqual(5);
      });
    });
    describe('it should remove from an internal node', function(){
        beforeEach(function(){
          _.each(_.range(1,12),function(item){
            btree.insert(item);
          });
        });
      it('should remove from an internal node rotating counterclockwise', function(){
        btree.remove(8);
        expect(btree.root.children[1].keys[0]).toEqual(6);
        expect(btree.root.children[1].keys[1]).toEqual(9);
        expect(btree.root.children[1].children[1].keys[0]).toEqual(7);
        expect(btree.root.children[1].children[1].keys[1]).toEqual(undefined);
        expect(btree.root.children[1].children[2].keys[0]).toEqual(10);
        expect(btree.root.children[1].children[2].keys[1]).toEqual(11);
        expect(btree.root.children[1].children[0].keys[0]).toEqual(5);
      });
      it('should remove from an internal node rotating clockwise twice', function(){
        btree.insert(0);
        btree.remove(2);
        expect(btree.root.children[0].keys[0]).toEqual(1);
        expect(btree.root.children[0].children[0].keys[0]).toEqual(0);
        expect(btree.root.children[0].children[1].keys[0]).toEqual(3);
        expect(btree.root.children[0].keys[1]).toEqual(4);
        expect(btree.root.children[0].children[2].keys[0]).toEqual(5);
        expect(btree.root.keys[0]).toEqual(6);
        expect(btree.root.children[1].keys[0]).toEqual(8);
        expect(btree.root.children[1].children[0].keys[0]).toEqual(7);
        expect(btree.root.children[1].children[1].keys[0]).toEqual(9);
      });
      it('should remove from an internal node by merging', function(){
        btree.remove(6);
        expect(btree.root.keys[0]).toEqual(4);
        expect(btree.root.children[1].keys[0]).toEqual(8);
        expect(btree.root.children[1].children[0].keys[0]).toEqual(5);
        expect(btree.root.children[1].children[0].keys[1]).toEqual(7);
        expect(btree.root.children[1].children[1].keys[0]).toEqual(9);
        expect(btree.root.children[1].children[1].keys[1]).toEqual(10);
        expect(btree.root.children[1].children[1].keys[2]).toEqual(11);
      });
    });
    describe('it should merge internal nodes', function(){
        beforeEach(function(){
          _.each(_.range(13,0,-1),function(item){
            btree.insert(item);
          });
        });
        it('should delete an internal key by rotating counterclockwise',function(){
          btree.remove(8);
          expect(btree.root.keys[0]).toEqual(6);
          expect(btree.root.children[1].children[0].keys[0]).toEqual(7);
          expect(btree.root.children[1].children[0].keys[1]).toEqual(9);
          expect(btree.root.children[1].children[1].keys[0]).toEqual(11);
          expect(btree.root.children[1].children[2].keys[0]).toEqual(13);
          expect(btree.root.children[1].keys[0]).toEqual(10);
          expect(btree.root.children[1].keys[1]).toEqual(12);
          expect(btree.root.children[1].keys[2]).toEqual(undefined);
        });
    });
  });
});
