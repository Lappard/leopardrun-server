'use strict';
var EventStream = function EventStream(){
    //defining a var instead of this (works for variable & function) will create a private definition
    var _listeners = {};
 
    this.emit = function (event, data) {
		if (_listeners[event] != undefined) {
			_listeners[event].forEach(function (entry) {
				entry(data);
			});
		}
	};
 
    this.on = function (event, callback) {
		if (_listeners[event] != undefined) {
			_listeners[event].push(callback);
		} else {
			_listeners[event] = [];
			_listeners[event].push(callback);
		}
	};

}
 
/* ************************************************************************
EventStream CLASS DEFINITION
************************************************************************ */
EventStream.instance = null;
 
/**
 * EventStream getInstance definition
 * @return EventStream class
 */
EventStream.getInstance = function(){
    if(this.instance === null){
        this.instance = new EventStream();
    }
    return this.instance;
}
 
module.exports = EventStream.getInstance();