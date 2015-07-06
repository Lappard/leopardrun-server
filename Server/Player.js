'use strict';


function Player(socket, guid) {
    var _position = null,
        _name = 'unnamed',
        _roomId = null,
        _socket = socket,
        _eventStream = require('./EventStream'),
        _guid = guid,
        _isReady = false,
        _active = true,
        _self = this,
        _level = null,
        _lastData = null,
        _persistanceManager = require("./PersistanceManager");

    _socket.on('message', function (data) {
        try {
            console.log(new Date().toISOString(), data);
            _lastData = JSON.parse(data);
            if (_lastData.method) {
                switch (_lastData.method) {
                    case "joinRoom":
                        // emit room join
                        // don't broadcast
                        break;
                    case "createLevel":
                        _self.generateLevel();
                        break;
                    case "submitScore":
                        break;

                    case "getSaveGames":
                        _self.getSaveGames()
                        break;

                    case "saveGame":
                        _self.saveGame(_lastData.gameData);
                        break;
                }
            }
            //_eventStream.emit('leopart-broadcast', {sender: _self, message:data});
        } catch (e) {
            var x = e;
            //data is not a object send string then..
            //_eventStream.emit('leopart-broadcast', {sender: _self, message:data});
        }

    });

    _socket.on('close', function () {
        //TODO: handle reconnection
        _active = false;
        _eventStream.emit('remove-player', _guid);
    });

    this.getSaveGames = function () {
        _persistanceManager.getAllSaveGames(function (games) {
            _self.send(games);
        });
    }

    this.saveGame = function (data) {
        if (data.GameName && data.Owner && data.Level && data.Actions && data.Date && data.PlayerScore) {
            _persistanceManager.saveGame(data);
        } else {
            var result = {
                Error:"missing property!!!!"
            };
            _self.send(result)
        }


    }


    this.send = function (data) {
        _socket.send(JSON.stringify(data));
    };

    this.getGuid = function () {
        return _guid;
    };

    this.isActive = function () {
        return _active;
    };


    this.generateLevel = function () {
        _level = require("./Level");
        _lastData.process = {
            level: _level.create()
        }
        this.send(_lastData);
    }


};

module.exports = Player