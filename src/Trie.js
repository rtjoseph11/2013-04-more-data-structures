var Trie = function(strValue){
	this.value = strValue ? strValue : '';
	this.children = [];
};

Trie.prototype.insert = function(strValue){
  if(strValue){
    var charInChildren = false;
    for (var i = 0; i < this.children.length; i++){
      if(this.children[i].value === strValue.charAt(0)){
        charInChildren = true;
        this.children[i].insert(strValue.substring(1));
      }
    }
    if (! charInChildren){
      this.children.push(new Trie(strValue.charAt(0)));
      this.children[this.children.length - 1].insert(strValue.substring(1));
    }
  }
};

Trie.prototype.contains = function(strValue){
  var containsStrValue = false;
  var rContains = function(string, context){
    if(string){
      for(var i = 0; i < context.children.length;i++){
        if(context.children[i].value === string.charAt(0)){
          containsStrValue = context.children[i].contains(string.substring(1));
          break;
        } 
        containsStrValue = false;
      }
    } else {
      containsStrValue = true;
    }
  };
  rContains(strValue, this);
  return containsStrValue;
};

Trie.prototype.remove = function(strValue){
  	
};

Trie.prototype.getNextLetters = function(strValue){
  var wholeString = strValue;
  var letterArray = [];
  var rLast = function(string, context){
    if(string.length > 0) {
      for (var i = 0; i < context.children.length; i++){
        if (context.children[i].value==string[0]){
          rLast(string.substring(1),context.children[i]);
        }
      }
    } else if (string.length === 0){
        _.each(context.children, function(item){
          letterArray.push(item.value);
        });
    } 
  };
  rLast(wholeString, this);
  return letterArray;
};