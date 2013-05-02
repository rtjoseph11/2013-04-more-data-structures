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
    if(this.countFilledElements()/this._limit>= 0.75){
       this.sizeUp();
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
  var self = this;
  var obj = self._storage.get(keyAsInt);
  if (obj) {
    _.each(obj,function(item, index){
      if(item[0] === key){
        if (obj.length === 1){
          self._storage.set(keyAsInt,undefined);
          return;
        } else {
          item.splice(index, 1);
          return;
        }
      }
    });
  }
  if(this.countFilledElements()/this._limit <= 0.25){
      this.sizeDown();
  }
  };

HashTable.prototype.countFilledElements = function(){
  var counter = 0;
  for (var i = 0; i < this._limit; i++){
    this._storage.get(i) && counter++;
  }
  return counter;
};

HashTable.prototype.sizeUp = function(){
  var self = this;
  var storageDump = self.dumpStorage();
  self._limit = self._limit * 2;
  self._storage = makeLimitedArray(self._limit);
  _.each(storageDump,function(element){
  self.insert(element[0], element[1]);
  });
};

HashTable.prototype.sizeDown = function(){
  var self = this;
  var storageDump = this.dumpStorage();
  self._limit = Math.floor(self._limit / 2);
  self._storage = makeLimitedArray(self._limit);
  _.each(storageDump, function(element){
    self.insert(element[0],element[1]);
  });
};

HashTable.prototype.dumpStorage = function(){
  var storageDump = [];
  for(var i = 0; i < this._limit; i++){
    if(this._storage.get(i)){
      storageDump.push(this._storage.get(i));
    }
  }
  storageDump = _.flatten(storageDump,true);
  return storageDump;
};
// NOTE: For this code to work, you will NEED the code from hashTableHelpers.js
// Start by loading those files up and playing with the functions it provides.
// You don't need to understand how they work, only their interface is important to you