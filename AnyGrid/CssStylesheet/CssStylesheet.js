function CssStylesheet() {
    this.__rules = [];
}

CssStylesheet.prototype = {
    addRule: function (selectors) {
        if (typeof selectors === "string")
            selectors = Array.prototype.slice.call(arguments);
        var rule = new CssRule(selectors.join(", "));
        this.__rules.push(rule);
        return rule;
    },
    toString: function () {
        return this.__rules.join("\n\n");
    }
}