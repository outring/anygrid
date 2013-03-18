var Extendable = require('lazy-extendable');

var CssStylesheet = Extendable.create(function () {
    return {

        constructor: function () {
            this.__rules = [];
        },

        addRule: function (selectors) {
            if (typeof selectors === "string")
                selectors = Array.prototype.slice.call(arguments);
            var rule = new CssRule(selectors.join(", "));
            this.__rules.push(rule);
            return rule;
        },

        toString: function () {
            return this.__rules.join("\r\n\r\n");
        }

    };
});

var CssRule = Extendable.create(function () {
    return {

        constructor: function (selector) {
            this.__properties = [];
            this.__selector = selector;
        },

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
});

var CssProperty = Extendable.create(function () {
    return {

        constructor: function (name, value) {
            this.__name = name;
            this.__value = value;
        },

        toString: function () {
            return "    " + this.__name + ": " + this.__value + ";"
        }
    };
});

module.exports = CssStylesheet;