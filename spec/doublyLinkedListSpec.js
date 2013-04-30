describe("doublyLinkedList", function() {
  var dll;

  beforeEach(function() {
    dll = makeDoublyLinkedList();
  });

  it("should have a head and tail", function() {
    expect(Object.keys(dll)).toContain("head");
    expect(Object.keys(dll)).toContain("tail");
  });

  it("should have methods named 'addToTail', 'removeHead', and 'contains'", function() {
    expect(dll.addToTail).toEqual(jasmine.any(Function));
    expect(dll.removeHead).toEqual(jasmine.any(Function));
    expect(dll.contains).toEqual(jasmine.any(Function));
    expect(dll.addToHead).toEqual(jasmine.any(Function));
    expect(dll.removeTail).toEqual(jasmine.any(Function));
  });
  describe("#addToTail", function(){
    it("the first element should point to null",function(){
      dll.addToTail("a");
      var temp = dll.removeHead();
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
    it("should remove an element",function(){

    });
    it("the second element should become the head", function(){

    });
    it("should return the removed element", function(){

    });
  });
  describe("#removeFromTail", function(){
    it("should remove an element",function(){

    });
    it("the penultimate element should become the tail", function(){

    });
    it("should return the removed element", function(){

    });
  });
  

  it("should remove an element from the head", function(){
    linkedList.addToTail("a");
    linkedList.addToTail("b");
    linkedList.removeHead();
    expect(linkedList.removeHead()).toEqual("b");
  });

});