// This file was automatically generated from "www.lmd.json"
(function (global, main, modules, modules_options, options) {
    var initialized_modules = {},
        global_eval = function (code) {
            return global.Function('return ' + code)();
        },
        
        global_document = global.document,
        local_undefined,
        /**
         * @param {String} moduleName module name or path to file
         * @param {*}      module module content
         *
         * @returns {*}
         */
        register_module = function (moduleName, module) {
            lmd_trigger('lmd-register:before-register', moduleName, module);
            // Predefine in case of recursive require
            var output = {'exports': {}};
            initialized_modules[moduleName] = 1;
            modules[moduleName] = output.exports;

            if (!module) {
                // if undefined - try to pick up module from globals (like jQuery)
                // or load modules from nodejs/worker environment
                module = lmd_trigger('js:request-environment-module', moduleName, module)[1] || global[moduleName];
            } else if (typeof module === 'function') {
                // Ex-Lazy LMD module or unpacked module ("pack": false)
                var module_require = lmd_trigger('lmd-register:decorate-require', moduleName, lmd_require)[1];

                // Make sure that sandboxed modules cant require
                if (modules_options[moduleName] &&
                    modules_options[moduleName].sandbox &&
                    typeof module_require === 'function') {

                    module_require = local_undefined;
                }

                module = module(module_require, output.exports, output) || output.exports;
            }

            module = lmd_trigger('lmd-register:after-register', moduleName, module)[1];
            return modules[moduleName] = module;
        },
        /**
         * List of All lmd Events
         *
         * @important Do not rename it!
         */
        lmd_events = {},
        /**
         * LMD event trigger function
         *
         * @important Do not rename it!
         */
        lmd_trigger = function (event, data, data2, data3) {
            var list = lmd_events[event],
                result;

            if (list) {
                for (var i = 0, c = list.length; i < c; i++) {
                    result = list[i](data, data2, data3) || result;
                    if (result) {
                        // enable decoration
                        data = result[0] || data;
                        data2 = result[1] || data2;
                        data3 = result[2] || data3;
                    }
                }
            }
            return result || [data, data2, data3];
        },
        /**
         * LMD event register function
         *
         * @important Do not rename it!
         */
        lmd_on = function (event, callback) {
            if (!lmd_events[event]) {
                lmd_events[event] = [];
            }
            lmd_events[event].push(callback);
        },
        /**
         * @param {String} moduleName module name or path to file
         *
         * @returns {*}
         */
        lmd_require = function (moduleName) {
            var module = modules[moduleName];

            var replacement = lmd_trigger('*:rewrite-shortcut', moduleName, module);
            if (replacement) {
                moduleName = replacement[0];
                module = replacement[1];
            }

            lmd_trigger('*:before-check', moduleName, module);
            // Already inited - return as is
            if (initialized_modules[moduleName] && module) {
                return module;
            }

            lmd_trigger('*:before-init', moduleName, module);

            // Lazy LMD module not a string
            if (typeof module === 'string' && module.indexOf('(function(') === 0) {
                module = global_eval(module);
            }

            return register_module(moduleName, module);
        },
        output = {'exports': {}},

        /**
         * Sandbox object for plugins
         *
         * @important Do not rename it!
         */
        sandbox = {
            'global': global,
            'modules': modules,
            'modules_options': modules_options,
            'options': options,

            'eval': global_eval,
            'register': register_module,
            'require': lmd_require,
            'initialized': initialized_modules,

            
            'document': global_document,
            
            

            'on': lmd_on,
            'trigger': lmd_trigger,
            'undefined': local_undefined
        };

    for (var moduleName in modules) {
        // reset module init flag in case of overwriting
        initialized_modules[moduleName] = 0;
    }

/**
 * @name sandbox
 */
(function (sb) {

// Simple JSON stringify
function stringify(object) {
    var properties = [];
    for (var key in object) {
        if (object.hasOwnProperty(key)) {
            properties.push(quote(key) + ':' + getValue(object[key]));
        }
    }
    return "{" + properties.join(",") + "}";
}

function getValue(value) {
    if (typeof value === "string") {
        return quote(value);
    } else if (typeof value === "boolean") {
        return "" + value;
    } else if (value.join) {
        if (value.length == 0) {
            return "[]";
        } else {
            var flat = [];
            for (var i = 0, len = value.length; i < len; i += 1) {
                flat.push(getValue(value[i]));
            }
            return '[' + flat.join(",") + ']';
        }
    } else if (typeof value === "number") {
        return value;
    } else {
        return stringify(value);
    }
}

function pad(s) {
    return '0000'.substr(s.length) + s;
}

function replacer(c) {
    switch (c) {
        case '\b': return '\\b';
        case '\f': return '\\f';
        case '\n': return '\\n';
        case '\r': return '\\r';
        case '\t': return '\\t';
        case '"': return '\\"';
        case '\\': return '\\\\';
        default: return '\\u' + pad(c.charCodeAt(0).toString(16));
    }
}

function quote(s) {
    return '"' + s.replace(/[\u0000-\u001f"\\\u007f-\uffff]/g, replacer) + '"';
}

function indexOf(item) {
    for (var i = this.length; i --> 0;) {
        if (this[i] === item) {
            return i;
        }
    }
    return -1;
}

    /**
     * @event *:request-json requests JSON polifill with only stringify function!
     *
     * @param {Object|undefined} JSON default JSON value
     *
     * @retuns yes
     */
sb.on('*:request-json', function (JSON) {
    if (typeof JSON === "object") {
        return [JSON];
    }

    return [{stringify: stringify}];
});

    /**
     * @event *:request-indexof requests indexOf polifill
     *
     * @param {Function|undefined} arrayIndexOf default indexOf value
     *
     * @retuns yes
     */
sb.on('*:request-indexof', function (arrayIndexOf) {
    if (typeof arrayIndexOf === "function") {
        return [arrayIndexOf];
    }

    return [indexOf];
});

}(sandbox));



    main(lmd_trigger('lmd-register:decorate-require', 'main', lmd_require)[1], output.exports, output);
})/*DO NOT ADD ; !*/
(this,(function (require, exports, module) { /* wrapped by builder */
var DemoGenerator = require(('./grid-demo-generator'));
var CssGenerator = require(('./css-generator'));
var BemCssGenerator = require(('./bemcss-generator'));

var $columnsCountInput = $('#ColumnsNumberInput');
var $gutterWidthInput = $('#GutterWidthInput');
var $getCodeButton = $('#GetCodeButton');
var $legacyIeSupportCheckbox = $('#LegacyIeSupport');
var $restoreCheckbox = $('#Restore');
var $bemCheckbox = $('#Bem');

var demoGenerator = new DemoGenerator({
    containerColumnsCount: 5,
    gridColumnsCount: $columnsCountInput.val(),
    gutterWidth: $gutterWidthInput.val(),
    containerClass: "preview-content",
    columnClass: "preview-col",
    alternativeColumnClass: "preview-col_alternative"
});

$("#Preview").append(demoGenerator.getContainer());

var self = this;

$columnsCountInput.bind('keyup change', function () {
    demoGenerator.setColumnsCount(this.value);
});

$gutterWidthInput.bind('keyup change', function () {
    demoGenerator.setGutterWidth(this.value);
});

$getCodeButton.mousedown(function () {
    var bemModeOn = $bemCheckbox.is(':checked');

    var options = {
        prefix: bemModeOn ? 'grid' : 'g-',
        legacyIeSupport: $legacyIeSupportCheckbox.is(':checked'),
        restore: $restoreCheckbox.is(':checked')
    };

    var grid = demoGenerator.getGrid();
    var cssGenerator = bemModeOn ? new BemCssGenerator(grid, options) : new CssGenerator(grid, options);

    $getCodeButton.attr('href', 'data:text/css,' + encodeURIComponent(cssGenerator.getCode()));
});

}),{
"lazy-extendable": (function (require, exports, module) { /* wrapped by builder */
(function (undefined) {

    var getObjectKeys = (function () {
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        var possibleNonEnumerableKeys = ["constructor", "hasOwnProperty", "isPrototypeOf", "toLocaleString", "toString", "valueOf"];
        var helper = {};
        for (var i = 0, l = possibleNonEnumerableKeys.length; i < l; i++)
            helper[possibleNonEnumerableKeys[i]] = true;
        var helperKeysMap = {};
        for (var key in helper)
            helperKeysMap[key] = true;
        var nonEnumerableKeys = [];
        for (var i = 0, l = possibleNonEnumerableKeys.length; i < l; i++)
            if (!hasOwnProperty.call(helperKeysMap, possibleNonEnumerableKeys[i]))
                nonEnumerableKeys.push(possibleNonEnumerableKeys[i]);
        if (nonEnumerableKeys.length > 0) {
            return function (o) {
                var result = [];
                var keysMap = {};
                for (var i = 0, l = nonEnumerableKeys.length; i < l; i++)
                    if (hasOwnProperty.call(o, nonEnumerableKeys[i])) {
                        result.push(nonEnumerableKeys[i])
                        keysMap[nonEnumerableKeys[i]] = true;
                    }
                for (var key in o)
                    if (hasOwnProperty.call(o, key) && !hasOwnProperty.call(keysMap, key))
                        result.push(key)
                return result;
            };
        }
        else
            return function (o) {
                var result = [];
                for (var key in o)
                    if (hasOwnProperty.call(o, key))
                        result.push(key);
                return result;
            };
    })();

    var global = (function () {
        return this !== undefined ? this : (0, eval)('this');
    })();

    var extending = false;
    var initializing = false;
    var initializingType;
    var currentBaseInstance;
    var callContexts = [];

    function LazyExtendable(instanceProperties, staticProperties) {
        if (this === global || this === undefined)
            throw 'Unexpected invocation of LazyExtendable constructor as a function. Use new LazyExtendable() or LazyExtendable.create()';
        if (extending === false && initializing === false)
            return LazyExtendable.create(instanceProperties, staticProperties);
        else
            return this;
    }

    function copyProperties(source, destination, ancestorBaseInstance) {
        var keys = getObjectKeys(source);
        for (var i = 0, l = keys.length; i < l; i++) {
            var key = keys[i];
            if (typeof source[key] !== 'function' || ancestorBaseInstance === undefined) {
                destination[key] = source[key];
                continue;
            }
            destination[key] = (function (method) {
                return function () {
                    var isBaseMethodCall = this === currentBaseInstance;
                    if (!isBaseMethodCall)
                        callContexts.push(this);
                    var prevBaseInstance = currentBaseInstance;
                    currentBaseInstance = ancestorBaseInstance;
                    var result = method.apply(callContexts[callContexts.length - 1], arguments);
                    currentBaseInstance = prevBaseInstance;
                    if (!isBaseMethodCall)
                        callContexts.pop();
                    return result;
                };
            })(source[key]);
        }
    }

    function extend(getInstanceProperties, staticProperties) {
        if (getInstanceProperties === undefined)
            getInstanceProperties = function () {
                return {};
            };
        if (staticProperties === undefined)
            staticProperties = {};

        var AncestorType = this;
        var ancestorBaseInstance;
        var initialized = false;
        var constructor;

        function DerivingType() {
            if (this === global || this === undefined)
                throw 'Unexpected invocation of type constructor as a function. Use new YourType()';
            if (extending === true)
                return this;
            if (initialized === false) {
                if (initializingType === undefined) {
                    initializingType = DerivingType;
                    initializing = true;
                }
                var prototype = DerivingType.prototype;
                if (ancestorBaseInstance === undefined)
                    ancestorBaseInstance = new AncestorType();
                var instanceProperties = getInstanceProperties(ancestorBaseInstance);
                copyProperties(instanceProperties, prototype, ancestorBaseInstance);
                constructor = prototype.constructor;
                prototype.constructor = DerivingType;
                initialized = true;
                if (initializingType === DerivingType) {
                    initializingType = undefined;
                    initializing = false;
                }
            }
            if (initializing === true)
                return this;
            constructor.apply(this, arguments);
        }

        extending = true;
        copyProperties(staticProperties, DerivingType);
        DerivingType.prototype = new AncestorType();
        DerivingType.extend = extend;
        extending = false;

        return DerivingType;
    }

    LazyExtendable.create = extend;

    if (typeof module !== undefined && 'exports' in module) {
        module.exports = LazyExtendable;
    }
    else if ('define' in global && typeof global.define === 'function')
        define(function () {
            return LazyExtendable;
        });
    else
        global.LazyExtendable = LazyExtendable;

})();
}),
"./anygrid": (function (require, exports, module) { /* wrapped by builder */
var Grid = require('./grid');
var GridBuilder = require('./grid-builder');

var CssGenerator = require('./css-generator');
var BemCssGenerator = require('./bemcss-generator');

var CssStylesheet = require('./css-stylesheet');

module.exports = {
    Grid: Grid,
    GridBuilder: GridBuilder,
    CssGenerator: CssGenerator,
    BemCssGenerator: BemCssGenerator,
    CssStylesheet: CssStylesheet
};
}),
"./bemcss-generator": (function (require, exports, module) { /* wrapped by builder */
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
}),
"./css-generator": (function (require, exports, module) { /* wrapped by builder */
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
}),
"./css-stylesheet": (function (require, exports, module) { /* wrapped by builder */
var Extendable = require('lazy-extendable');

var CssStylesheet = Extendable.create(function () {
    return {

        constructor: function (name) {
            this.name = name;
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
}),
"./grid-builder": (function (require, exports, module) { /* wrapped by builder */
var Extendable = require('lazy-extendable');
var Grid = require('./grid');

var GridBuilder = Extendable.create(function () {
    return {

        constructor: function (containerCols) {
            this.__containerCols = containerCols || 5;
            if (100 % this.__containerCols !== 0)
                throw new Error("Wrong cols count");
        },

        getMaxGutterWidth: function () {
            return 100 / this.__containerCols - 1;
        },

        getGrid: function (gridCols, gutterWidth) {
            return new Grid(this.__containerCols, gridCols, gutterWidth)
        }

    };
});

module.exports = GridBuilder;
}),
"./grid-demo-generator": (function (require, exports, module) { /* wrapped by builder */
var Extendable = require('lazy-extendable');
var GridBuilder = require('./grid-builder');

var GridDemoGenerator = Extendable.create(function () {
    return {

        constructor: function (options) {
            this.__options = options;
            this.__columns = [];
            this.__descriptor = new GridBuilder(this.__options.containerColumnsCount);
            this.__gridColumnsCount = this.__options.gridColumnsCount;
            this.__gutterWidth = this.__options.gutterWidth;
            this.__createContainer();
            this.__createColumnTemplate();
            this.__updateGrid();
        },

        __createContainer: function () {
            this.__container = document.createElement("div");
            this.__container.className = this.__options.containerClass;
            this.__containerPlaceholder = document.createElement("div");
        },

        __createColumnTemplate: function () {
            this.__columnTemplate = document.createElement("div");
            this.__columnTemplate.className = this.__options.columnClass;
        },

        __createColumn: function () {
            return this.__columnTemplate.cloneNode(false);
        },

        getGrid: function () {
            return this.__grid;
        },

        getContainer: function () {
            return this.__container;
        },

        setColumnsCount: function (count) {
            count = parseInt(count, 10);
            if (isNaN(count))
                return;
            this.__gridColumnsCount = count;
            this.__updateGrid();
        },

        setGutterWidth: function (width) {
            width = parseInt(width, 10);
            if (isNaN(width))
                return;
            this.__gutterWidth = width;
            this.__updateGrid();
        },

        __updateGrid: function () {
            try {
                this.__grid = this.__descriptor.getGrid(this.__gridColumnsCount, this.__gutterWidth);
                this.__updateGridView();
            }
            catch (e) {
            }
        },

        __updateGridView: function () {
            this.__detachContainer();
            this.__container.style.marginRight = 100 - this.__grid.getContainerWidth() + "%";
            var generatedCount = this.__columns.length;
            for (var i = 0, l = Math.max(this.__gridColumnsCount, generatedCount); i < l; i++) {
                if (i >= generatedCount) {
                    this.__columns[i] = this.__createColumn();
                    this.__container.appendChild(this.__columns[i]);
                }
                if (i < this.__gridColumnsCount) {
                    this.__columns[i].style.display = "";
                    this.__setColumnStyle(this.__columns[i], i + 1);
                }
                else
                    this.__columns[i].style.display = "none";
            }
            this.__attachContainer();
        },

        __detachContainer: function () {
            this.__switchNodes(this.__container, this.__containerPlaceholder);
        },

        __attachContainer: function () {
            this.__switchNodes(this.__containerPlaceholder, this.__container);
        },

        __switchNodes: function (removingNode, addingNode) {
            if (!removingNode.parentNode)
                return;
            removingNode.parentNode.insertBefore(addingNode, removingNode);
            removingNode.parentNode.removeChild(removingNode);
        },

        __setColumnStyle: function (column, offset) {
            var moduleWidth = this.__grid.getModuleWidth(1);
            column.style.left = this.__grid.getModuleOffset(offset) + "%";
            column.style.marginRight = moduleWidth * -1 + "%";
            column.style.width = moduleWidth + "%";
            this.__toggleColumnAlternativeClass(column, offset);
        },

        __toggleColumnAlternativeClass: function (column, offset) {
            var alternativeClass = this.__options.alternativeColumnClass;
            if (this.__gutterWidth < 2 && offset % 2 === 0) {
                if (column.className.indexOf(alternativeClass) === -1)
                    column.className += " " + alternativeClass;
            }
            else
                column.className = column.className.replace(alternativeClass, "");
        }

    };
});

module.exports = GridDemoGenerator;

}),
"./grid": (function (require, exports, module) { /* wrapped by builder */
var Extendable = require('lazy-extendable');

var Grid = Extendable.create(function () {
    return {

        constructor: function (containerCols, gridCols, gutterWidth) {
            if (gridCols < containerCols)
                throw new Error("Container cols number can't be less than grid cols");
            if (gridCols === containerCols && gutterWidth > 0)
                throw new Error("Container cols number can't be less than grid cols");
            this.__containerCols = containerCols;
            this.gridCols = gridCols;
            this.__maxColWidth = 100 / containerCols;
            this.__gutterWidth = gutterWidth;
            this.__colRelativeGutterWidth = this.__gutterWidth / this.__maxColWidth;
            if (this.__gutterWidth >= this.__maxColWidth)
                throw new Error("Gutter width can't be greater than col width")
        },

        getContainerWidth: function () {
            var gutterLessWidth = 100 / this.gridCols * this.__containerCols;
            var gutterCompensation = gutterLessWidth * this.__colRelativeGutterWidth / this.gridCols;
            return this.__round(gutterLessWidth + gutterCompensation);
        },

        getModuleWidth: function (span) {
            return this.__maxColWidth * span - this.__gutterWidth;
        },

        getModuleOffset: function (col) {
            return this.__maxColWidth * (col - 1);
        },

        getRestoreWidth: function (span) {
            var restoreWidth = 1 / (span - this.__colRelativeGutterWidth) * 100;
            return this.__round(restoreWidth);
        },

        getRestoredContainerWidth: function () {
            return this.__containerCols * 100;
        },

        getRestoredInitialWidth: function () {
            return (this.gridCols - this.__colRelativeGutterWidth) * 100;
        },

        getRestoredOffset: function (col) {
            return 100 * (col - 1) * -1;
        },

        __round: function (float) {
            return Math.round(float * 100) / 100;
        }

    };
});

module.exports = Grid;
})
},{},{});
