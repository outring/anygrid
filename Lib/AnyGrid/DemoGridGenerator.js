define(["./AnyGridDescriptor"], function (AnyGridDescriptor) {

    function DemoGridGenerator(options) {
        this.__options = options;
        this.__init();
    }

    DemoGridGenerator.prototype = {
        __init: function () {
            this.__columns = [];
            this.__descriptor = new AnyGridDescriptor(this.__options.containerColumnsCount);
            this.__gridColumnsCount = this.__options.gridColumnsCount;
            this.__gutterWidth = this.__options.gutterWidth;
            this.__updateGrid();
            this.__container = document.createElement("div");
            this.__createColumnTemplate();
        },
        get: function () {
            return this.__container;
        },
        setColumnsCount: function (count) {
            this.__gridColumnsCount = count;
            this.__updateGrid();
        },
        setGutterWidth: function (width) {
            //todo validate through descriptor
            this.__gutterWidth = width;
            this.__updateGrid();
        },
        __updateGrid: function () {
            this.__grid = this.__descriptor.getGrid(this.__gridColumnsCount, this.__gutterWidth);
            this.__updateGridView();
        },
        __updateGridView: function () {
            var generatedCount = this.__columns.length;
            for (var i = 0, l = Math.max(this.__gridColumnsCount, generatedCount); i < l; i++) {
                if (i >= generatedCount) {
                    this.__columns[i] = this.__createColumn();
                    this.__container.appendChild(this.__columns[i]);
                }
                if (i < this.__gridColumnsCount) {
                    this.__columns[i].style.display = "";
                    this.__setColumnStyle(this.__columns[i], i);
                }
                else
                    this.__columns[i].style.display = "none";
            }
        },
        __setColumnStyle: function (column, index) {
            var blockWidth = this.__grid.getBlockWidth(1);
            column.style.left = this.__grid.getBlockOffset(index) + "%";
            column.style.marginRight = blockWidth * 1 + "%";
            column.style.width = blockWidth + "%";
        },
        __createColumnTemplate: function () {
            this.__columnTemplate = document.createElement("div");
            this.__columnTemplate.className = this.__options.columnClass;
        },
        __createColumn: function () {
            return this.__columnTemplate.cloneNode(false);
        }
    };

    return DemoGridGenerator;

});
