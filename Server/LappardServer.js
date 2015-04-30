'use strict';
var HashMap = require('./Util/HashMap');
var WebSocketServer = require('ws').Server;


function LappardServer(){
	this.connections = new HashMap();
	this.clientIndex = 0;
	this.wss = new WebSocketServer({ port: 1337 });
};

LappardServer.prototype.start = function(){
	if(this.wss){
		console.log('Server started on port: '+ this.wss.port);
	}
	
	//anonyme functions got own this scope
	var that = this;
	this.wss.on('connection', function connection(ws) {
		ws.clientIndex = that.clientIndex++;
		
		
		ws.on('message', function incoming(message) {
			that.connections.each(function(index,key,conn){
				if(ws !== conn){
					that.sendMessageTo(conn,'von clientNr: ' + ws.clientIndex + ': ' +message);
				}
			});
		});
		
		that.sendMessageTo(ws, 'Connected to the server! ClientIndex: ' +(that.clientIndex-1));
		that.connections.put(ws.clientIndex,ws);
	});
};

LappardServer.prototype.sendMessageTo = function(connection, msg) {
	try { 
		connection.send(msg); 
	} catch (e) {
		console.log(e);
		this.connections.remove(connection);
	 }
};



module.exports = LappardServer;