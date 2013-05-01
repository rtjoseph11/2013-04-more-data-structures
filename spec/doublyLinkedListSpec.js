describe("doublyLinkedList", function() {
  var dll;
  beforeEach(function() {
    dll = makeDoublyLinkedList();
  });

  it("should have a head and tail", function() {
    expect(Object.keys(dll)).toContain("head");
    expect(Object.keys(dll)).toContain("tail");
  });

  it("should have methods named 'addToTail', 'removeFromHead', and 'contains'", function() {
    expect(dll.addToTail).toEqual(jasmine.any(Function));
    expect(dll.removeFromHead).toEqual(jasmine.any(Function));
    expect(dll.contains).toEqual(jasmine.any(Function));
    expect(dll.addToHead).toEqual(jasmine.any(Function));
    expect(dll.removeFromTail).toEqual(jasmine.any(Function));
  });
  describe("#addToTail", function(){
    it("the first element should point to null",function(){
      dll.addToTail("a");
      var temp = dll.removeFromHead();
      expect(temp).toEqual("a");
    });
    it("addToTail should add to the list", function(){
      dll.addToTail("a");
      expect(dll.contains("a")).toBe(true);
    });
    it("should add to the end of the list", function(){
      dll.addToHead("b");
      dll.addToTail("a");
      dll.addToTail("c");
      expect(dll.tail.next.value).toEqual("a");
    });
  });
  describe("#addToHead", function(){
    it("should add to the list", function(){
      dll.addToHead("a");
      expect(dll.contains("a")).toBe(true);
    });
    it("should add to the front of the list",function(){
      dll.addToHead("a");
      dll.addToTail("c");
      dll.addToHead("b");
      expect(dll.head.value).toEqual("b");
      expect(dll.tail.value).toEqual("c");
    });
    it("next should be null for new nodes", function(){
      dll.addToHead("a");
      dll.addToHead("b");
      expect(dll.head.next).toEqual(null);
      expect(dll.tail.next.value).toEqual("b");
    });
  });
  describe("#removeFromHead", function(){
    beforeEach(function(){
      dll.addToHead('b');
      dll.addToHead('a');
      dll.addToTail('c');
    });
    it("should remove an element",function(){
      expect(dll.removeFromHead()).toEqual('a');

    });
    it("the second element should become the head", function(){
      expect(dll.removeFromHead()).toEqual('a');
      expect(dll.removeFromHead()).toEqual('b');
      expect(dll.head.value).toEqual('c');
    });
    it("should return the removed element", function(){
      expect(dll.removeFromHead()).toEqual('a');
    });
  });
  describe("#removeFromTail", function(){
    beforeEach(function(){
      dll.addToHead('b');
      dll.addToHead('a');
      dll.addToTail('c');
    });
    it("should remove an element",function(){
      expect(dll.removeFromTail()).toEqual('c');
    });
    it("the penultimate element should become the tail", function(){
      dll.removeFromTail();
      expect(dll.tail.value).toEqual('b');
    });
    it("should return the removed element", function(){
      expect(dll.removeFromTail()).toEqual('c');
    });
  });
  describe("#contains", function(){
    it("should find elements in the list", function(){
      dll.addToTail("a");
      dll.addToTail("c");
      dll.addToTail("b");
      expect(dll.contains("a")).toEqual(true);
      expect(dll.contains("b")).toEqual(true);
      expect(dll.contains("c")).toEqual(true);
    });
  });
});