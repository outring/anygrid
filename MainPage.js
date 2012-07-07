define(
    [
        'js!' + 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js',
        './Lib/AnyGrid/AnyGridDescriptor',
        './Lib/AnyGrid/CssGenerator'
    ],
    function (jQueryLoaded, AnyGridDescriptor, CssGenerator) {

        function MainPage() {
            var defaultContainerCols = 5;
            var defaultGridCols = 12;
            var defaultGutterWidth = 5;

            var descriptor = new AnyGridDescriptor(defaultContainerCols);
            var grid = descriptor.getGrid(defaultGridCols, defaultGutterWidth);

            var $preview = $('#Preview');
            var cols = $preview.children();
            var $columnsNumberInput = $('#ColumnsNumberInput');
            var $gutterWidthInput = $('#GutterWidthInput');
            var $colTemplate = $('<div />', { class: "preview-col" });

            function generateCols(colsCount) {
                for (var i = 1; i <= colsCount; i++) {
                    var $col = $colTemplate.clone().appendTo($preview);
                    cols.push($col);
                }
            }

            function fixView(colsCount, gutterWidth) {
                for (var i = 1, l = cols.length; i <= l; i++) {
                    var $col = cols[i - 1];
                    if (i <= colsCount)
                        $col
                            .css({
                                left: grid.getBlockOffset(i) + "%",
                                marginRight: -grid.getBlockWidth(1) + "%",
                                width: grid.getBlockWidth(1) + "%"
                            })
                            .toggleClass("preview-col_alternative", gutterWidth === 0 && i % 2 === 0)
                            .show();
                    else
                        $col.hide()
                }
            }

            function regenerate() {
                var newColsCount = $columnsNumberInput.val();
                var newGutterWidth = $gutterWidthInput.val();
                if (newColsCount === "" || newGutterWidth === "")
                    return;
                newColsCount = parseInt(newColsCount);
                newGutterWidth = parseInt(newGutterWidth);
                if (isNaN(newColsCount) || isNaN(newGutterWidth))
                    return;
                if (newGutterWidth < 0)
                    return;
                try {
                    grid = descriptor.getGrid(newColsCount, newGutterWidth);
                    $preview.css({ marginRight: 100 - grid.getContainerWidth() + "%" });
                    var $previewPlaceholder = $preview.after('<div />').next();
                    $preview.detach();
                    if (newColsCount > cols.length)
                        generateCols(newColsCount - cols.length);
                    fixView(newColsCount, newGutterWidth);
                    $previewPlaceholder.after($preview);
                    $previewPlaceholder.remove();
                }
                catch (e) {
                }
            }

            $columnsNumberInput.add($gutterWidthInput).bind('keyup change', regenerate);

            $columnsNumberInput.val(defaultGridCols);
            $gutterWidthInput.val(defaultGutterWidth);

            regenerate();

            $('#GetCodeButton').click(function () {
                var generator = new CssGenerator(grid, { prefix: "g-" });
                var win = window.open('data:text/css,' + encodeURIComponent(generator.getCode()));
            });
        }

        return MainPage;
    });