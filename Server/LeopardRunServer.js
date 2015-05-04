'use strict';
var HashMap = require('./Util/HashMap'),
 	Player = require('./Player'),
 	Chance = require('chance');



//function LappardServer() {
//    var _connections = new HashMap(),
//        _eventStream = require('./EventStream'),
//        _chance = new Chance();
//
//    _eventStream.on('new-connection', function(ws) {
//        console.log('ws connection');
//        var guid = _chance.guid();
//        // check if client connection is ok
//        // check if clinet has a valid guid for reconnection!!
//        if (true) {
//            ws.send(JSON.stringify({guid:guid}));
//            _connections.put(guid, new Player(ws, guid));
//        }
//    });
//
//    /**
//     * [description]
//     * @param  {[type]}
//     * @return {[type]}
//     */
//    _eventStream.on('leopart-broadcast', function(data) {
//        if (data.sender && data.message) {
//            var response = {senderGuid:data.sender.getGuid(), message: data.message};
//            _connections.each(function(index, key, item) {
//                if (item.getGuid() !== data.sender.getGuid() && item.isActive()) {
//                    item.send(response);
//                }
//            });
//        } else {
//        	new Error('object need message and sender attribute');
//        }
//    });
//};

class LeopardRunServer {
    constructor(){
        this.blub = true;
    };

    getBlub(){
        return this.blub;
    }

}




module.exports = new LeopardRunServer();
