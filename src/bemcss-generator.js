var CssGenerator = require('./css-generator');

var BemCssGenerator = CssGenerator.extend(function (base) {
    return {

        _generateContainerStyles: function () {
            var stylesheet = base._generateContainerStyles();
            stylesheet.name = 'grid';
            return stylesheet;
        },

        _generateGenericModuleStyles: function () {
            var stylesheet = base._generateGenericModuleStyles();
            stylesheet.name = 'grid__module';
            return stylesheet;
        },

        _generateFirstModuleStyles: function () {
            var stylesheet = base._generateFirstModuleStyles();
            stylesheet.name = 'grid__module_first_yes';
            return stylesheet;
        },

        _generateModuleSpanStyles: function () {
            var stylesheet = base._generateModuleSpanStyles();
            stylesheet.name = 'grid__module_span';
            return stylesheet;
        },

        _generateModuleColStyles: function () {
            var stylesheet = base._generateModuleColStyles();
            stylesheet.name = 'grid__module_col';
            return stylesheet;
        },

        _generateRestoreStyles: function () {
            var stylesheet = base._generateRestoreStyles();
            stylesheet.name = 'grid__restore';
            return stylesheet;
        },

        _getContainerClass: function () {
            return this.__prefix + '_cols_' + this.__grid.gridCols;
        },

        _getInitialClass: function () {
            return this.__prefix + "__initial";
        },

        _getRestoreClass: function () {
            return this.__prefix + "__restore";
        },

        _getRowClass: function () {
            return this.__prefix + "__row";
        },

        _getGenericModuleClass: function () {
            return this.__prefix + '__module';
        },

        _getModuleFirstClass: function () {
            return this._getGenericModuleClass() + "_first_yes";
        },

        _getModuleSpanClass: function (span) {
            return this._getGenericModuleClass() + "_span_" + span;
        },

        _getModuleColClass: function (col) {
            return  this._getGenericModuleClass() + "_col_" + col;
        }

    };
});

module.exports = BemCssGenerator;