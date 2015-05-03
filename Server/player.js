'use strict';

function Player (_socket, _guid){
	var position = null,
		name = 'unnamed',
		room = null,
		socket = _socket,
		eventStream = require('./EventStream'),
		guid = _guid,
		is_ready = false, 
		active = true,
		self = this;

	socket.on('message', function(data){
		try{
			var data = JSON.parse(data);
		}catch(e){
			//data is not a object
		}
		eventStream.emit('leopart-braodcast', {sender: self, message:data});
	});

	socket.on('close',function(){
		//TODO: handle reconnection
		active = false;
	});

	this.send = function(data){
		socket.send(JSON.stringify(data));
	};

	this.getGuid = function(){
		return guid;
	};

	this.isActive = function(){
		return active;
	};


};

module.exports = Player