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
            this.__colRelativeGutterWidth = this.__gutterWidth / this.__maxColWidth;
            if (this.__gutterWidth >= this.__maxColWidth)
                throw new Error("Gutter width can't be greater than col width")
        },

        getContainerWidth: function () {
            var gutterLessWidth = 100 / this.gridCols * this.__containerCols;
            var gutterCompensation = gutterLessWidth * this.__colRelativeGutterWidth / this.gridCols;
            return this.__round(gutterLessWidth + gutterCompensation);
        },

        getModuleWidth: function (span) {
            return this.__maxColWidth * span - this.__gutterWidth;
        },

        getModuleOffset: function (col) {
            return this.__maxColWidth * (col - 1);
        },

        getRestoreWidth: function (span) {
            var restoreWidth = 1 / (span - this.__colRelativeGutterWidth) * 100;
            return this.__round(restoreWidth);
        },

        getRestoredContainerWidth: function () {
            return this.__containerCols * 100;
        },

        getRestoredInitialWidth: function () {
            return (this.gridCols - this.__colRelativeGutterWidth) * 100;
        },

        getRestoredOffset: function (col) {
            return 100 * (col - 1) * -1;
        },

        __round: function (float) {
            return Math.round(float * 100) / 100;
        }

    };
});

module.exports = Grid;