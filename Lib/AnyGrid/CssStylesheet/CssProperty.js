define(function() {

    function CssProperty(name, value) {
        this.__name = name;
        this.__value = value;
    }

    CssProperty.prototype = {
        toString: function() {
            return "    " + this.__name + ": " + this.__value + ";"
        }
    }

    return CssProperty;
});