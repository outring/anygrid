var Extendable = require('lazy-extendable');
var Grid = require('./grid');

var GridBuilder = Extendable.create(function () {
    return {

        constructor: function (containerCols) {
            this.__containerCols = containerCols || 5;
            if (100 % this.__containerCols !== 0)
                throw new Error("Wrong cols count");
        },

        getMaxGutterWidth: function () {
            return 100 / this.__containerCols - 1;
        },

        getGrid: function (gridCols, gutterWidth) {
            return new Grid(this.__containerCols, gridCols, gutterWidth)
        }

    };
});

module.exports = GridBuilder;