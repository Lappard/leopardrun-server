/**
 * @author Jonathan Wiemers
 */

'use strict';

var Chance = require('chance');

/**
 *
 *
 * @constructor
 */
function Level() {
    var _level = [],
        _chance = new Chance();

    this.create = function () {
        var result = {
            levelparts: []
        };
        for (var i = 0; i < 10; ++i) {
            result.levelparts.push(_createLevelPart())
        }
        return result;
    };

    var _createLevelPart = function () {
        var result = [];
        // generate ground
        for (var i = 0; i < 28; ++i) {
            var groundHeight = _chance.integer({min: 0, max: 1});
            result.push({"type": "g", "x": i, "y": groundHeight})
            if (_chance.bool({likelihood: 30})) {
                result.push({"type": "b", "x": i, "y": _chance.integer({min: groundHeight + 1, max: 3})});
            }
            if (_chance.bool({likelihood: 5})) {
                result.push({"type": "f", "x": i, "y": _chance.integer({min: groundHeight + 1, max: 3})});
            }
            if (_chance.bool({likelihood: 15})) {
                result.push({"type": "c", "x": i, "y": _chance.integer({min: groundHeight + 1, max: 3})});
            }
        }
        _level.push(result);
        return result;
    };
}


module.exports = new Level();