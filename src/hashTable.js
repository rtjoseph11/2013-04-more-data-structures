var HashTable = function(){
  this._limit = 8;

  // Use a limited array to store inserted elements.
  // It'll keep you from using too much space. Usage:
  //
  //   limitedArray.set(3, 'hi');
  //   limitedArray.get(3); // alerts 'hi'
  //
  this._storage = makeLimitedArray(this._limit);
};

HashTable.prototype.insert = function(key, value){
  var keyAsInt = getIndexBelowMaxForKey(key, this._limit);
  var obj = this._storage.get(keyAsInt);
  if (!obj){
    obj = [[key,value]];
    this._storage.set(keyAsInt, obj);
  }
  else {
    _.each(obj,function(item){
      if(item[0] === key){
        item[1] = value;
        return undefined;
      }
    });
    obj.push([key,value]);
    }
};

HashTable.prototype.retrieve = function(key){
  var keyAsInt = getIndexBelowMaxForKey(key,this._limit);
  var obj = this._storage.get(keyAsInt);
  if (obj){
    var result;
     _.each(obj,function(item){
       if(item[0]===key){
         result = item[1];
       }
     });
     return result;
  }
};

HashTable.prototype.remove = function(key){
  var keyAsInt = getIndexBelowMaxForKey(key, this._limit);
  var obj = this._storage.get(keyAsInt);
  if (obj) {
    _.each(obj,function(item, index){
      if(item[0] === key){
        item.splice(index, 1);
        return undefined;
      }
    });
    }
  };

// NOTE: For this code to work, you will NEED the code from hashTableHelpers.js
// Start by loading those files up and playing with the functions it provides.
// You don't need to understand how they work, only their interface is important to you