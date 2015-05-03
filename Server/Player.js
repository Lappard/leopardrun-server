'use strict';

function Player (socket, guid){
	var _position = null,
		_name = 'unnamed',
		_roomId = null,
		_socket = socket,
		_eventStream = require('./EventStream'),
		_guid = _guid,
		_isReady = false, 
		_active = true,
		_self = this;

	_socket.on('message', function(data){
		try{
			var data = JSON.parse(data);
			if(data.method){
				switch(data.method){
					case "join room": 
						// emit room join
						// don't broadcast
						break;


				}
			}
			_eventStream.emit('leopart-broadcast', {sender: _self, message:data});
		}catch(e){
			//data is not a object send string then..
			_eventStream.emit('leopart-broadcast', {sender: _self, message:data});
		}
		
	});

	_socket.on('close',function(){
		//TODO: handle reconnection
		_active = false;
	});

	this.send = function(data){
		_socket.send(JSON.stringify(data));
	};

	this.getGuid = function(){
		return _guid;
	};

	this.isActive = function(){
		return _active;
	};


};

module.exports = Player