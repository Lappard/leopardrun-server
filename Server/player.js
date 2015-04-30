'use strict';
module.exports = {
	Player: function (_x, _y, _name, _socket){
		this.position = null;
		this.name = _name;
		this.room = null;
		this.socket = _socket;
		this.is_ready = false;
		
		
		this.Ready = function(){
			if (this.room != null){
				this.is_ready = true;
			}
		};
		
		this.Cancel = function(){
			if (this.room != null){
				this.is_ready = false;
			}		
		};
	
	}
};