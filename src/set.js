var makeSet = function(){
  var set = Object.create(setPrototype);
  set._storage = [];
  return set;
};

var setPrototype = {};

setPrototype.add = function(value){
  if(this._storage.indexOf(value)=== -1){
    this._storage.push(value);
  }
};

setPrototype.contains = function(value){
  return this._storage.indexOf(value) !== -1;
};

setPrototype.remove = function(value){
  var x =this._storage.indexOf(value);
  if (x !==-1) {
    this._storage.splice(x,1);
  }
};
