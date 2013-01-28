define(["./CssProperty"], function(CssProperty) {

    function CssRule(selector) {
        this.__properties = [];
        this.__selector = selector;
    }

    CssRule.prototype = {
        addProperty: function (name, value) {
            this.__properties.push(new CssProperty(name, value));
            return this;
        },
        toString: function () {
            return [
                this.__selector + " {",
                this.__properties.join("\r\n"),
                "}"
            ].join("\r\n");
        }
    };

    return CssRule;

});