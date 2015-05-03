'use strict';

function WebSocketServerImpl() {
    var WebSocketServer = require('ws').Server,
        eventStream = require('./EventStream'),
        port = 1337,

        wss = new WebSocketServer({
            port: port
        });
    if (wss) {
        console.log('Server started on port: ' + port);
    } else {
        new Error('Could not start server!');
    }
    wss.on('connection', function connection(ws) {
        eventStream.emit('new-connection', ws);
    });

};


module.exports = new WebSocketServerImpl();
