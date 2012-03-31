function AnyGrid(containerCols, gridCols, gutterWidth) {
    if (gridCols < containerCols)
        throw new Error("Container cols number can't be less than grid cols");
    this.__containerCols = containerCols;
    this.gridCols = gridCols;
    this.__maxColWidth = 100 / containerCols;
    this.__gutterWidth = gutterWidth;
    if (this.__gutterWidth >= this.__maxColWidth)
        throw new Error("Gutter width can't be greater than col width")
}

AnyGrid.prototype = {
    getContainerWidth: function () {
        var width = this.__getGutterlessContainerWidth();
        width += (width * this.__gutterWidth / this.__maxColWidth) / this.gridCols;
        return Math.round(width * 100) / 100;
    },
    __getGutterlessContainerWidth: function () {
        return this.__containerCols / this.gridCols * 100;
    },
    getBlockWidth: function (blockNum) {
        return this.__maxColWidth * (blockNum - 1) + this.__maxColWidth - this.__gutterWidth;
    },
    getBlockOffset: function (blockNum) {
        return this.__maxColWidth * (blockNum - 1);
    }
};