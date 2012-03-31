function CssGenerator(grid, options) {
    this.__grid = grid;
    this.__options = options;
}

CssGenerator.prototype = {
    getCode: function () {
        var g = this.__grid;
        var s = new CssStylesheet();

        var gridCols = g.gridCols

        var prefix = "." + this.__options.prefix;
        var contClass = prefix + gridCols;
        var rowClass = prefix + "row";

        var containerPressing = 100 - g.getContainerWidth() + "%";

        s.addRule(contClass)
            .addProperty("padding-right", containerPressing)
            .addProperty("position", "relative");

        s.addRule("* html " + contClass)
            .addProperty("margin-right", containerPressing)

        s.addRule(contClass, rowClass)
            .addProperty("zoom", 1);

        s.addRule(contClass + ":before", contClass + ":after", rowClass + ":before", rowClass + ":after")
            .addProperty("clear", "both")
            .addProperty("content", "''")
            .addProperty("display", "block");

        s.addRule(prefix + "first")
            .addProperty("clear", "left");

        s.addRule(this.__getSpanClasses())
            .addProperty("display", "inline")
            .addProperty("float", "left")
            .addProperty("position", "relative");

        for (var i = 1; i <= gridCols; i++)
            s.addRule(this.__getSpanClass(i))
                .addProperty("margin-right", -g.getBlockWidth(i) + "%")
                .addProperty("width", g.getBlockWidth(i) + "%");

        for (var i = 1; i <= gridCols; i++)
            s.addRule(this.__getColClass(i))
                .addProperty("left", g.getBlockOffset(i) + "%");

        return s.toString();
    },
    __getSpanClasses: function () {
        var classes = [];
        for (var i = 1; i <= this.__grid.gridCols; i++)
            classes.push(this.__getSpanClass(i));
        return classes;
    },
    __getSpanClass: function (width) {
        return "." + this.__options.prefix + "span-" + width;
    },
    __getColClass: function (offset) {
        return "." + this.__options.prefix + "col-" + offset;
    }
};