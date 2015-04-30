
var WebSocketServer = require('ws').Server, 	
	wss = new WebSocketServer({ port: 1337 });

if(wss){
	console.log('Server started on port 1337');
}

var connections = [],
	clientIndex = 0;


wss.on('connection', function connection(ws) {
	ws.clientIndex = clientIndex++;
  	ws.on('message', function incoming(message) {
  		connections.forEach(function(conn){
  			if(ws !== conn){
				sendMessage(conn,'von clientNr: ' + ws.clientIndex + ': ' +message);
  			}
  		});
  	});

	sendMessage(ws, 'Connected to the server! ClientIndex: ' +(clientIndex-1));
  	connections.push(ws);
});


function sendMessage(connection, msg) {
	try { 
		connection.send(msg); 
	} catch (e) {
		console.log(e);
		 connections.forEach(function(conn){
  			if(connection === conn){
				console.log('deleted: ' + conn.clientIndex);
  				var index = connections.indexOf(conn);
  				if (index > -1) {
					connections.splice(index, 1);
				}
  			}
  		});
	}
}