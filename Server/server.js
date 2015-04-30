
var WebSocketServer = require('ws').Server, 	
	wss = new WebSocketServer({ port: 1337 });


var connections = [];

wss.on('connection', function connection(ws) {

  	ws.on('message', function incoming(message) {
  		connections.forEach(function(conn){
  			if(ws !== conn){
  				conn.send('vom Server: '+message);
  			}
  		})
  	});

  ws.send('Connected to the server!');

  connections.push(ws)

});