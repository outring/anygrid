var Extendable = require('lazy-extendable');
var CssStylesheet = require('./css-stylesheet');

var CssGenerator = Extendable.create(function () {
    return {

        constructor: function (grid, options) {
            this.__grid = grid;
            this.__options = options;
            this.__prefix = "." + this.__options.prefix;
        },

        getCode: function () {
            return this.getStylesheets().join('\n\n');
        },

        getStylesheets: function () {

            var stylesheets = [];

            stylesheets.push(this._generateContainerStyles());
            stylesheets.push(this._generateGenericModuleStyles());
            stylesheets.push(this._generateFirstModuleStyles());
            stylesheets.push(this._generateModuleSpanStyles());
            stylesheets.push(this._generateModuleColStyles());

            if (this.__options.restore)
                stylesheets.push(this._generateRestoreStyles());

            return stylesheets;
        },

        _generateContainerStyles: function () {
            var s = new CssStylesheet('container');

            var containerClass = this._getContainerClass();
            var rowClass = this._getRowClass();
            var containerPressing = 100 - this.__grid.getContainerWidth() + "%";

            var containerRule = s.addRule(containerClass)
                .addProperty("padding-right", containerPressing)
                .addProperty("position", "relative")
                .addProperty("-moz-box-sizing", "border-box")
                .addProperty("-webkit-box-sizing", "border-box")
                .addProperty("box-sizing", "border-box");

            if (this.__options.legacyIeSupport) {
                containerRule
                    .addProperty("*padding-right", 0)
                    .addProperty("*margin-right", containerPressing)

                s.addRule(containerClass, rowClass)
                    .addProperty("*zoom", 1);
            }

            s.addRule(containerClass + ":before", containerClass + ":after", rowClass + ":before", rowClass + ":after")
                .addProperty("clear", "both")
                .addProperty("content", "''")
                .addProperty("display", "block");

            return s;
        },

        _generateGenericModuleStyles: function () {
            var s = new CssStylesheet('module');

            var modulesRule = s.addRule(this._getGenericModuleClass())
                .addProperty("float", "left")
                .addProperty("position", "relative");

            if (this.__options.legacyIeSupport)
                modulesRule.addProperty("*display", "inline");

            return s;
        },

        _generateFirstModuleStyles: function () {
            var s = new CssStylesheet('first');

            s.addRule(this._getModuleFirstClass())
                .addProperty("clear", "left");

            return s;
        },

        _generateModuleSpanStyles: function () {
            var s = new CssStylesheet('span');

            var g = this.__grid;

            for (var i = 1; i <= g.gridCols; i++)
                s.addRule(this._getModuleSpanClass(i))
                    .addProperty("margin-right", g.getModuleWidth(i) * -1 + "%")
                    .addProperty("width", g.getModuleWidth(i) + "%");

            return s;
        },

        _generateModuleColStyles: function () {
            var s = new CssStylesheet('col');

            var g = this.__grid;

            for (var i = 1; i <= g.gridCols; i++)
                s.addRule(this._getModuleColClass(i))
                    .addProperty("left", g.getModuleOffset(i) + "%");

            return s;
        },

        _generateRestoreStyles: function () {
            var s = new CssStylesheet('restore');

            var g = this.__grid;

            var restoreClass = this._getRestoreClass();
            var initialClass = this._getInitialClass();
            var containerClass = this._getContainerClass();

            var commonRule = s.addRule(restoreClass, initialClass)
                .addProperty("position", "relative");

            if (this.__options.legacyIeSupport)
                commonRule.addProperty("*zoom", 1);

            s.addRule(restoreClass + " " + containerClass)
                .addProperty("padding-right", 0)
                .addProperty("margin-right", 100 - g.getRestoredContainerWidth() + "%");

            s.addRule(restoreClass + " " + initialClass)
                .addProperty("margin-right", 100 - g.getRestoredInitialWidth() + "%");

            for (var i = 1; i <= g.gridCols; i++) {
                s.addRule(this._getModuleSpanClass(i) + " " + restoreClass)
                    .addProperty("margin-right", parseFloat((100 - g.getRestoreWidth(i)).toFixed(2)) + "%");

                s.addRule(this._getModuleColClass(i) + " " + restoreClass + " " + containerClass,
                        this._getModuleColClass(i) + " " + restoreClass + " " + initialClass)
                    .addProperty("left", g.getRestoredOffset(i) + "%");
            }

            return s;
        },

        _getContainerClass: function () {
            return this.__prefix + this.__grid.gridCols;
        },

        _getInitialClass: function () {
            return this.__prefix + "initial";
        },

        _getRestoreClass: function () {
            return this.__prefix + "restore";
        },

        _getRowClass: function () {
            return this.__prefix + "row";
        },

        _getGenericModuleClass: function () {
            var classes = [];
            for (var i = 1; i <= this.__grid.gridCols; i++)
                classes.push(this._getModuleSpanClass(i));
            return classes;
        },

        _getModuleFirstClass: function () {
            return this.__prefix + "first";
        },

        _getModuleSpanClass: function (span) {
            return this.__prefix + "span-" + span;
        },

        _getModuleColClass: function (col) {
            return this.__prefix + "col-" + col;
        }

    };
});

module.exports = CssGenerator;