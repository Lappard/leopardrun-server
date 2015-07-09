/**
 * @author Jonathan Wiemers
 */

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
                        _self.getSaveGames();
                        break;

                    case "saveGame":
                        _self.saveGame(_lastData.gameData);
                        break;
                }
            }
        } catch (e) {
            var x = e;
            console.log(e)
        }
    });

    _socket.on('close', function () {
        //TODO: handle reconnection
        _active = false;
        _eventStream.emit('remove-player', _guid);
    });

    this.getSaveGames = function () {
        _persistanceManager.getAllSaveGames(function (games) {
            _lastData.process = {
                games:games
            };
            _self.send(_lastData);
        });
    };

    this.saveGame = function (data) {
        if (data.gameName && data.owner && data.level && data.actions && data.date && data.playerScore) {
            _persistanceManager.saveGame(data);
            _lastData.process = {
                Status:"Game Saved!"
            };
        } else {
            _lastData.process = {
                Error:"Missing property!!!!",
                Status:"Error"
            };
        }
        _self.send(_lastData)

    };


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