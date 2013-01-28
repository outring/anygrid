define(
	[
		'js!' + 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js',
		'./Lib/AnyGrid/AnyGridDemoGenerator',
		'./Lib/AnyGrid/AnyGridCssGenerator'
	],
	function (jQueryLoaded, DemoGenerator, CssGenerator) {

		function GridGeneratorPage() {
			this.__init();
		}

		GridGeneratorPage.prototype = {
			__init: function () {
				this.__$columnsCountInput = $('#ColumnsNumberInput');
				this.__$gutterWidthInput = $('#GutterWidthInput');
				this.__$getCodeButton = $('#GetCodeButton');
				this.__$legacyIeSupportCheckbox = $('#LegacyIeSupport');
				this.__$restoreCheckbox = $('#Restore');
				this.__generator = new DemoGenerator({
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
			__attachEventHandlers: function () {
				var self = this;
				this.__$columnsCountInput.bind('keyup change', function () {
					self.__generator.setColumnsCount(this.value);
				});
				this.__$gutterWidthInput.bind('keyup change', function () {
					self.__generator.setGutterWidth(this.value);
				});
				this.__$getCodeButton.mousedown(function () {
					var generator = new CssGenerator(self.__generator.getGrid(), {
						prefix: "g-",
						legacyIeSupport: self.__$legacyIeSupportCheckbox.is(':checked'),
						restore: self.__$restoreCheckbox.is(':checked')
					});
					self.__$getCodeButton.attr('href', 'data:text/css,' + encodeURIComponent(generator.getCode()));
				});
			}
		};

		return GridGeneratorPage;
	});