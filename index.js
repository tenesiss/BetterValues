const $GV = new Map();
const EventEmitter = require('events');
class BGlobal extends EventEmitter {
    constructor(emit=true){
      super();
      this.coll = new Map();
      if(typeof emit != "boolean") {
          throw new Error("Property BGlobal.emitOn must be boolean, debugt<>");
      }
      this.emitOn = emit;
    }
    add(key, v){
        this.coll.set(key, v);
        if(this.emitOn){
            this.emit("added", { key, value: v, time: Date.now() });
        }
    }
    update(key, v){
        if(!this.coll.get(key)){
            throw new Error("Invalid key.. t<>");
        }
        this.coll.set(key, v);
        if(this.emitOn){
            this.emit("update", { key, value: v, time: Date.now() });
        }
    }
    set(key, v){
        if(this.get(key)){
            this.update(key, v);
        } else {
            this.add(key, v);
        }
    }
    get(key){
        return this.coll.get(key);
    }
    remove(key){
        this.coll.delete(key);
        if(this.emitOn){
            this.emit("deleted", { v: key, time: Date.now() });
        }
    }
    reset(reason="No reason given."){
       this.coll = new Map();
       if(this.emitOn){
           this.emit("reset", { reason, time: Date.now() });
       }
    }
}
class BValue extends EventEmitter {
    constructor(base, value, key, saveInGlobal=true){
        super();
        this.base = base;
        if(!this.base.coll){
            throw new Error("Base metadata can't be null");
        }
        this.key = key;
        this.val = value;
        this.createdAt = Date.now();
        this.type = typeof this.val;
        if(saveInGlobal == true){
            this.save();
        }
        this.cache = [];
    }
    set(newV){// Sets new value silently, without firing any event, caching funciton, etc..
       this.val = newV;
       this.type = typeof newV;
    }
    update(newV, avoidSaving=false){
       this.val = newV;
       this.type = typeof newV;
       this.emit("valueUpdate", { newValue: newV, time: Date.now() });
       this.cache.push(newV); // Adds this change to cache
       if(avoidSaving == false){
        this.save();
       }
    }
    prop(propName, propVal=null, avoidEmit=false){
      if(!propVal){
          return this.val[propName];
      } else {
          this.val[propName] = propVal;
          if(avoidEmit == false){
            this.emit("propChanged", { name: propName, newValue: propVal });
          }
      }
    }
    delete(options={}){
      var auxV = this.val;
      this.val = null;
      this.deleted = true;
      this.deletedAt = Date.now();
      if(options.cleanCache){
          this.resetCache();
      }
      if(!options.avoidEmit){
        this.emit("valueDeleted", { value: auxV, time: this.deletedAt, reason: (options.reason || "No reason given") });
      }
      if(!options.avoidGlobalDeletion){
       this.base.remove(this.key);
      }
      if(options.saveOldValueOnCache){
          this.cache.push(auxV);
      }
    }
    resetCache(keepLastValue = false){
       if(keepLastValue == true){
           var lastVal = this.cache[this.cache.length-1];
       }
       this.cache = [];
       if(lastVal){
           this.cache.push(lastVal);
       }
    }
    log(){
        console.log(this.val);
    }
    obj(){
        return this.val;
    }
    save(){
        // Save to global map
        if(typeof this.key != "string") {
            throw new Error("Key must be a valid string!");
        }
        this.base.set(this.key, this);
    }
}

// function betterize(v){
//     // Betterize value
//     let vBetter = new BValue(v, time);
//     return vBetter;
// }