var GridBuilder = require(('./grid-builder'));
var CssGenerator = require(('./css-generator'));

var builder = new GridBuilder(5);
var grid = builder.getGrid(12, window.gutterWidth);
var cssGenerator = new CssGenerator(grid, { prefix: 'g-', legacyIeSupport: true, restore: true });
var style = document.createElement("style");
style.innerText = cssGenerator.getCode();
document.getElementsByTagName("head")[0].appendChild(style);