'use strict';

/**
 *
 *
 * @constructor
 */
function Level(){
    var level = [];

    this.create = function () {
        var result = {
            levelparts = []
        };
        for (var i = 0; i < 10; ++i){
            result.levelparts.push(_createLevelPart())
        }
        return result;
    };
    
    var _createLevelPart = function () {
        return result = [
            {"type":"g","x":0,"y":0},
            {"type":"b","x":0,"y":1},
            {"type":"b","x":2,"y":2},
            {"type":"b","x":3,"y":1},
            {"type":"b","x":5,"y":3}
        ];
    };
}



module.exports = new LevelCreator();