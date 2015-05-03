var EventStream = function EventStream(){
    //defining a var instead of this (works for variable & function) will create a private definition
    var listeners = {};
 
    this.emit = function (event, data) {
		if (listeners[event] != undefined) {
			listeners[event].forEach(function (entry) {
				entry(data);
			});
		}
	};
 
    this.on = function (event, callback) {
		if (listeners[event] != undefined) {
			listeners[event].push(callback);
		} else {
			listeners[event] = [];
			listeners[event].push(callback);
		}
	};
 
    if(EventStream.caller != EventStream.getInstance){
        throw new Error("This object cannot be instanciated");
    }
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