describe("set", function() {
  var set;

  beforeEach(function() {
    set = makeSet();
  });

  it("should have methods named 'add', 'contains', and 'remove'", function() {
    expect(set.add).toEqual(jasmine.any(Function));
    expect(set.contains).toEqual(jasmine.any(Function));
    expect(set.remove).toEqual(jasmine.any(Function));
  });

  describe("#add", function(){
    it("should add strings to the set", function(){
      set.add("a");
      expect(set._storage[0]).toEqual("a");
    });
    it("should not add a duplicate element to the set", function(){
      set.add("a");
      set.add("a");
      var count = 0;
      for (var i = 0; i < set._storage.length; i++){
        if(set._storage[i] === "a"){
          count++;
        }
      }
      expect(count).toEqual(1);
    });
  });
  describe("#contains", function(){
    beforeEach(function(){
      set.add("a");
      set.add("b");
      set.add("c");
    });
    it("should contain added strings", function(){
      expect(set.contains("a")).toEqual(true);
      expect(set.contains("b")).toEqual(true);
      expect(set.contains("c")).toEqual(true);
    });
    it("should not contain other strings", function(){
      expect(set.contains("d")).toEqual(false);
    });
  });
  describe('#remove', function(){
    it("should remove an element from the set", function(){
      set.add("a");
      set.remove("a");
      expect(set.contains("a")).toEqual(false);
    });
  });

});