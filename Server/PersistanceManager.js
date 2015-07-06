'use strict';

var PersistanceManager = function PersistanceManager(){
    var jsonfile = require('jsonfile');
    var util = require('util');

    jsonfile.spaces = 4;


    this.getAllSaveGames = function(callback){
        var file = __dirname + '/games/savegames.json';

        jsonfile.readFile(file, function(err, obj) {
            console.dir(obj)
            callback(obj);
        });
    }

    this.saveGame = function(newGame){


        var file = __dirname + '/games/savegames.json';
        jsonfile.readFile(file, function(err, obj) {
            obj.push(newGame);
            jsonfile.writeFile(file, obj, function (err) {
                console.error(err)
            })

        });

    }

};



/* ************************************************************************
 EventStream CLASS DEFINITION
 ************************************************************************ */
PersistanceManager.instance = null;

/**
 * EventStream getInstance definition
 * @return EventStream class
 */
PersistanceManager.getInstance = function(){
    if(this.instance === null){
        this.instance = new PersistanceManager();
    }
    return this.instance;
}

module.exports = PersistanceManager.getInstance();