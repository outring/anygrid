var Extendable = require('lazy-extendable');

var Grid = Extendable.create(function () {
    return {

        constructor: function (containerCols, gridCols, gutterWidth) {
            if (gridCols < containerCols)
                throw new Error("Container cols number can't be less than grid cols");
            if (gridCols === containerCols && gutterWidth > 0)
                throw new Error("Container cols number can't be less than grid cols");
            this.__containerCols = containerCols;
            this.gridCols = gridCols;
            this.__maxColWidth = 100 / containerCols;
            this.__gutterWidth = gutterWidth;
            if (this.__gutterWidth >= this.__maxColWidth)
                throw new Error("Gutter width can't be greater than col width")
        },

        getContainerWidth: function () {
            return this.__round(this.__getContainerWidth());
        },

        __getContainerWidth: function () {
            var width = this.__getGutterlessContainerWidth();
            width += (width * this.__gutterWidth / this.__maxColWidth) / this.gridCols;
            return width;
        },

        __getGutterlessContainerWidth: function () {
            return this.__containerCols / this.gridCols * 100;
        },

        getBlockWidth: function (width) {
            return this.__maxColWidth * (width - 1) + this.__maxColWidth - this.__gutterWidth;
        },

        getBlockOffset: function (offset) {
            return this.__maxColWidth * (offset - 1);
        },

        getRestoreWidth: function (width) {
            var restoreWidth = 1 / width * 100;
            return this.__round(restoreWidth);
        },

        getRestoredContainerWidth: function () {
            return this.__containerCols * 100;
        },

        getRestoredInitialWidth: function () {
            return this.gridCols * 100;
        },

        getRestoredOffset: function (offset) {
            return 100 * (offset - 1) * -1;
        },

        __round: function (float) {
            return Math.round(float * 100) / 100;
        }

    };
});

module.exports = Grid;