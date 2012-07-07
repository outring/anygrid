define(
    [
        'js!' + 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js',
        './Lib/AnyGrid/DemoGridGenerator',
        './Lib/AnyGrid/CssGenerator'
    ],
    function (jQueryLoaded, DemoGridGenerator, CssGenerator) {

        function MainPage() {
            this.__init();
        }

        MainPage.prototype = {
            __init: function() {
                this.__$columnsCountInput = $('#ColumnsNumberInput');
                this.__$gutterWidthInput = $('#GutterWidthInput');
                this.__$getCodeButton = $('#GetCodeButton');
                this.__generator = new DemoGridGenerator({
                    containerColumnsCount: 5,
                    gridColumnsCount: this.__$columnsCountInput.val(),
                    gutterWidth: this.__$gutterWidthInput.val(),
                    containerClass: "preview-content",
                    columnClass: "preview-col",
                    alternativeColumnClass: "preview-col_alternative"
                });
                $("#Preview").append(this.__generator.getContainer());
                this.__attachEventHandlers();
            },
            __attachEventHandlers: function() {
                var self = this;
                this.__$columnsCountInput.bind('keyup change', function() {
                    self.__generator.setColumnsCount(this.value);
                });
                this.__$gutterWidthInput.bind('keyup change', function() {
                    self.__generator.setGutterWidth(this.value);
                });
                this.__$getCodeButton.click(function () {
                    var generator = new CssGenerator(self.__generator.getGrid(), { prefix: "g-" });
                    window.open('data:text/css,' + encodeURIComponent(generator.getCode()));
                });
            }
        };

        return MainPage;
    });