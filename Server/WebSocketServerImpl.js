'use strict';

function WebSocketServerImpl() {
    var WebSocketServer = require('ws').Server,
        _eventStream = require('./EventStream'),
        _port = 1337,
        _wss = new WebSocketServer({
            port: _port
        });
    if (_wss) {
        console.log('Server started on port: ' + _port);
    } else {
        new Error('Could not start server!');
    }
    _wss.on('connection', function connection(ws) {
        _eventStream.emit('new-connection', ws);
    });

};


module.exports = new WebSocketServerImpl();
