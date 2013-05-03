describe("hashTable", function() {
  var hashTable;

  beforeEach(function() {
    hashTable = new HashTable();
  });

  it("should have methods named 'insert' and 'retrieve", function() {
    expect(hashTable.insert).toEqual(jasmine.any(Function));
    expect(hashTable.retrieve).toEqual(jasmine.any(Function));
    expect(hashTable.remove).toEqual(jasmine.any(Function));
  });
  describe("#insert()", function(){
    it("should insert a key-value pair", function(){
      hashTable.insert('a', 1);
      expect(hashTable.retrieve('a')).toEqual(1);
    });
    it("should overwrite existing keys", function(){
      hashTable.insert('a',1);
      hashTable.insert('a',2);
      expect(hashTable.retrieve('a')).toEqual(2);
    });
    it('should handle collisions gacefully', function(){
      hashTable._limit = 1;
      hashTable.insert('a',1);
      hashTable.insert('b',2);
      expect(hashTable.retrieve('a')).toEqual(1);
      expect(hashTable.retrieve('b')).toEqual(2);
    });
  });
  describe("#retrieve()", function(){
    it('should retrieve the right value for a key', function(){
      hashTable.insert('a', 2);
      hashTable.insert('b', 1);
      expect(hashTable.retrieve('a')).toEqual(2);
    });
  });
  describe("#remove()", function(){
    it('should remove the right key value pair', function(){
      hashTable.insert('a',1);
      hashTable.insert('b',2);
      hashTable.remove('b');
      expect(hashTable.retrieve('a')).toEqual(1);
      expect(hashTable.retrieve('b')).toEqual(undefined);
    });
  });
  describe("#countFilledElements", function(){
    it("should return the correct hash array length", function(){
      hashTable.insert("nick", 1);
      expect(hashTable.countFilledElements()).toEqual(1);
      hashTable.insert("tucker",2);
      expect(hashTable.countFilledElements()).toEqual(2);
      hashTable.insert("sebastian",3);
      expect(hashTable.countFilledElements()).toEqual(3);
      hashTable.insert("char",4);
      expect(hashTable.countFilledElements()).toEqual(3);
    });
  });
  describe("#sizeUp", function(){
    it("should resize the hash table", function(){
    hashTable._limit = 2;
    hashTable.insert("nick", 190);
    hashTable.insert("tucker", 1);
    expect(hashTable._limit).toEqual(4);
    expect(hashTable.retrieve("tucker")).toEqual(1);
    expect(hashTable.retrieve("nick")).toEqual(190);
    hashTable.insert("sebastian", 1);
    expect(hashTable._limit).toEqual(8);
    });
  });
  describe("#sizeDown", function(){
    it("should resize the hash table", function(){
    hashTable._limit = 5;
    hashTable.insert("nick", 1900);
    hashTable.insert("tucker", 1);
    hashTable.remove("tucker");
    expect(hashTable._limit).toEqual(2);
    expect(hashTable.retrieve("nick")).toEqual(1900);
    });
  });
});