/**
 * @author Jonathan Wiemers
 */

'use strict';

var HashMap = require('./Util/HashMap');

/**
 * [Room description]
 * @param {[type]} id [description]
 */
function Room(id){
	var _id = id,
    	_connections = new HashMap();

    /**
     * [description]
     * @param  {Object} 
     * @return {[type]}
     */
	eventStream.on('leopart-room-'+id+'-braodcast', function(data) {
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

}