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
