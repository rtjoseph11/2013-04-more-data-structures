describe("Trie", function(){
	var trie;
	beforeEach(function(){
		trie = new Trie();
	});
	it("should have methods #insert, #contains, #remove, #getNextLetters", function(){
		expect(trie.insert).toEqual(jasmine.any(Function));
		expect(trie.contains).toEqual(jasmine.any(Function));
		expect(trie.remove).toEqual(jasmine.any(Function));
		expect(trie.getNextLetters).toEqual(jasmine.any(Function));
	});
	describe('#insert()', function(){
		it("should insert a word", function(){
          trie.insert('a');
          expect(trie.contains('a')).toEqual(true);
		});
		it("should add subsequent letters as children",function(){
			trie.insert('an');
			expect(trie.contains('an')).toEqual(true);
			expect(trie.getNextLetters('')).toEqual(['a']);
		});
		it("should not add duplicate letters to a node", function(){
          trie.insert('a');
          trie.insert('an');
          expect(trie.getNextLetters('')).toEqual(['a']);
          trie.insert('ant');
          expect(trie.getNextLetters('a')).toEqual(['n']);
		});
		// it("should handle an empty string", function(){
  //         // expect(trie.insert("")).not.toThrow();
		// });
		// it("should handle the same string twice", function(){
  //         trie.insert('a');
  //         // expect(trie.insert('a')).not.toThrow();
  //         expect(trie.contains('aa')).not.toEqual(true);
		// }); 
	});
	describe("#contains", function(){
      it('should return true for a key after it is inserted', function(){
        trie.insert('ant');
        expect(trie.contains('ant')).toEqual(true);
      });
      it('should return true for any subkeys within a key', function(){
        trie.insert('antimatter');
        trie.insert('antithesis');
        expect(trie.contains('an')).toEqual(true);
        expect(trie.contains('ant')).toEqual(true);
        expect(trie.contains('anti')).toEqual(true);
        expect(trie.contains('antima')).toEqual(true);
        expect(trie.contains('antith')).toEqual(true);
      });
      it('should return false for non-sequential subkeys', function(){
        trie.insert('antimatter');
        trie.insert('antithesis');
        expect(trie.contains('m')).toEqual(false);
        expect(trie.contains('matter')).toEqual(false);
        expect(trie.contains('thesis')).toEqual(false);
      });
	});
	describe("#remove", function(){
		beforeEach(function(){
			trie.insert('inn');
			trie.insert('int');
			trie.insert('im');
			trie.insert('innovate');
			trie.insert('apple');
		});
		it("should remove a whole word", function(){
			trie.remove('apple');
			expect(trie.contains('apple')).toEqual(false);
		});
		it("should not impact other complete words", function(){
          trie.remove('im');
          expect(trie.contains('inn')).toEqual(true);
          expect(trie.contains('im')).toEqual(false);
		});
		it("should not remove the beginnings of larger words", function(){
          trie.remove('inn');
          expect(trie.contains('innovate')).toEqual(true);
          expect(trie.contains('inn')).toEqual(true);
		});
		it("should remove all letters unique to the removed word", function(){
			trie.remove('innovate');
			expect(trie.contains('innovate')).toEqual(false);
			expect(trie.contains('inn')).toEqual(false);
			expect(trie.contains('int')).toEqual(true);
		});
	});
	describe("#getNextLetters", function(){
		beforeEach(function(){
          trie.insert('inn');
          trie.insert('int');
          trie.insert('im');
          trie.insert('innovate');
          trie.insert('apple');
		});
        it("should return the next letter in the word", function(){
          expect(trie.getNextLetters('inn')).toEqual(['o']);
        });
        it("should return multiple letters", function(){
          expect(trie.getNextLetters('in')).toEqual(['n','t']);
        });
        it("should return all starting letters for the top node", function(){
          expect(trie.getNextLetters("")).toEqual(['i','a']);
        });
	});
});