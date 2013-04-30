describe("linkedList", function() {
  var linkedList;

  beforeEach(function() {
    linkedList = makeLinkedList();
  });

  it("should have a head and tail", function() {
    expect(Object.keys(linkedList)).toContain("head");
    expect(Object.keys(linkedList)).toContain("tail");
  });

  it("should have methods named 'addToTail', 'removeHead', and 'contains'", function() {
    expect(linkedList.addToTail).toEqual(jasmine.any(Function));
    expect(linkedList.removeHead).toEqual(jasmine.any(Function));
    expect(linkedList.contains).toEqual(jasmine.any(Function));
  });

  it("the first element should point to null",function(){
    linkedList.addToTail("a");
    var temp = linkedList.removeHead();
    expect(temp).toEqual("a");
  });

  it("should add an element tothe list", function(){
    linkedList.addToTail("a");
    expect(linkedList.contains("a")).toBe(true);
  });

  it("should add to the end of the list", function(){
    linkedList.addToTail("a");
    linkedList.addToTail("b");
    expect(linkedList.removeHead()).toEqual("a");
  });

  it("should remove an element from the head", function(){
    linkedList.addToTail("a");
    linkedList.addToTail("b");
    linkedList.removeHead();
    expect(linkedList.removeHead()).toEqual("b");
  });
  it("should find elements in the list", function(){
    linkedList.addToTail("a");
    linkedList.addToTail("c");
    linkedList.addToTail("b");
    expect(linkedList.contains("a")).toEqual(true);
    expect(linkedList.contains("b")).toEqual(true);
    expect(linkedList.contains("c")).toEqual(true);
  });

});