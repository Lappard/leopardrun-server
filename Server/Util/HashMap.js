'use strict';

/**
 * simple hashmap implementation
 * 
 */
function HashMap(){
  	this._dict = [];
};

/**
 * [_get description]
 * @param  {[type]}
 * @return {[type]}
 */
HashMap.prototype._get = function(key){
  	for(var i=0, couplet; couplet = this._dict[i]; i++){
    	if(couplet[0] === key){
      		return couplet;
	    }
  	}
};

/**
 * [each description]
 * @param  {Function}
 * @return {[type]}
 */
HashMap.prototype.each = function(callback){
    for(var i=0, couplet; couplet = this._dict[i]; i++){
        callback(i, couplet[0], couplet[1]);
    }
};

HashMap.prototype.remove = function(object){
    var that = this;
    this.each(function(i,key,value){
        if(object === value){
            that._dict.splice(i,1);
        }
    });
};

/**
 * [put description]
 * @param  {[type]}
 * @param  {[type]}
 * @return {[type]}
 */
HashMap.prototype.put = function(key, value){
  	var couplet = this._get(key);
  	if(couplet){
    	couplet[1] = value;
  	} else {
    	this._dict.push([key, value]);
  	}
  	return this; // for chaining
};

/**
 * [get description]
 * @param  {[type]}
 * @return {[type]}
 */
HashMap.prototype.get = function(key){
  	var couplet = this._get(key);
  	if(couplet){
    	return couplet[1];
  	}
};


module.exports = HashMap;