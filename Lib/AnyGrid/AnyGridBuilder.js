define(["./AnyGrid"], function (AnyGrid) {

    function AnyGridBuilder(containerCols) {
        this.__containerCols = containerCols || 5;
        if (100 % this.__containerCols !== 0)
            throw new Error("Wrong cols count");
    }

    AnyGridBuilder.prototype = {
        getMaxColWidth: function () {
            return 100 / this.__containerCols;
        },
        getGrid: function (gridCols, gutterWidth) {
            return new AnyGrid(this.__containerCols, gridCols, gutterWidth)
        }
    };

    return AnyGridBuilder;

});