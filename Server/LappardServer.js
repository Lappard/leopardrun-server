'use strict';
var HashMap = require('./Util/HashMap'),
 	Player = require('./Player'),
 	Chance = require('chance');



function LappardServer() {
    var connections = new HashMap(),
        clientIndex = 0,
        port = 1337,
        eventStream = require('./EventStream'),
        chance = new Chance();

    eventStream.on('new-connection', function(ws) {
        var guid = chance.guid();
        // check if client connection is ok
        // check if clinet has a valid guid for reconnection!!
        if (true) {
            ws.send(JSON.stringify({guid:guid}));
            connections.put(guid, new Player(ws, guid));
        }
    });

    /**
     * [description]
     * @param  {[type]}
     * @return {[type]}     
     */
    eventStream.on('leopart-braodcast', function(data) {
        if (data.sender && data.message) {
            var response = {senderGuid:data.sender.getGuid(), message: data.message};
            connections.each(function(index, key, item) {
                if (item.getGuid() !== data.sender.getGuid() && item.isActive()) {
                    item.send(response);
                }
            });
        } else {
        	new Error('object need message and sender attribute');
        }
    });
};



module.exports = new LappardServer();
