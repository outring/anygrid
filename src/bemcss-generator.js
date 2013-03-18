var CssGenerator = require('./css-generator');

var BemCssGenerator = CssGenerator.extend(function () {
    return {

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