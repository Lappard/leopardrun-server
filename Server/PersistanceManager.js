/**
 * @author Jonathan Wiemers
 */

'use strict';

var PersistanceManager = function PersistanceManager() {


    var jsonfile = require('jsonfile'),
        util = require('util'),
        fs = require('fs'),
        _self = this;
    jsonfile.spaces = 4;


    /**
     * check if savegames file realy exists
     */
    var checkSaveGameFile = function () {
        fs.readFile(__dirname + '/games/savegames.json', 'utf8', function (err, data) {
            fs.mkdir(__dirname + '/games', function (err) {
                //console.log(err);
            });
            if (data == undefined) {
                fs.writeFile(__dirname + '/games/savegames.json', [], 'utf8', function (err) {
                    //console.log(err);
                });
            }
        });
    };

    /**
     * returns sorted and truncated (10) array
     *
     * @param obj savegames
     * @returns {array}
     */
    var checkForGameAmount = function (obj) {
        if(obj.length >= 10){
            var result = [];
            obj.sort(function(a, b){return parseInt(b.PlayerScore) -  parseInt(a.PlayerScore)});
            obj = obj.splice(0,10);
        }
        return obj;
    };


    /**
     * read all savegems from filesystem
     * @param callback
     */
    this.getAllSaveGames = function (callback) {
        checkSaveGameFile();
        var file = __dirname + '/games/savegames.json';
        jsonfile.readFile(file, function (err, obj) {
            obj = checkForGameAmount(obj);
            callback(obj);
        });
    };

    /**
     * Saves new savegame to the filesystem
     * @param newGame
     */
    this.saveGame = function (newGame) {
        checkSaveGameFile();
        var file = __dirname + '/games/savegames.json';
        jsonfile.readFile(file, function (err, obj) {
            if (Object.prototype.toString.call(obj) !== '[object Array]') {
                obj = [];
            }
            obj = checkForGameAmount(obj);
            obj.push(newGame);
            jsonfile.writeFile(file, obj, function (err) {
                //console.error(err)
            })
        });
    };
};

PersistanceManager.instance = null;

/**
 * PersistanceManager getInstance definition
 * @return PersistanceManager class
 */
PersistanceManager.getInstance = function () {
    if (this.instance === null) {
        this.instance = new PersistanceManager();
    }
    return this.instance;
};

module.exports = PersistanceManager.getInstance();