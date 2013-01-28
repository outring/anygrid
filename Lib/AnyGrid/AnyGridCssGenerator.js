define(["./CssStylesheet/CssStylesheet"], function (CssStylesheet) {

	function CssGenerator(grid, options) {
		this.__grid = grid;
		this.__options = options;
		this.__prefix = "." + this.__options.prefix;
	}

	CssGenerator.prototype = {
		getCode: function () {
			var g = this.__grid;
			var s = new CssStylesheet();

			var gridCols = g.gridCols;

			var containerClass = this.__prefix + gridCols;
			var initialClass = this.__prefix + "initial";
			var restoreClass = this.__prefix + "restore";
			var rowClass = this.__prefix + "row";

			var containerPressing = 100 - g.getContainerWidth() + "%";

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

			s.addRule(this.__prefix + "first")
				.addProperty("clear", "left");

			var spansRule = s.addRule(this.__getSpanClasses())
				.addProperty("float", "left")
				.addProperty("position", "relative");

			if (this.__options.legacyIeSupport)
				spansRule.addProperty("*display", "inline");

			if (this.__options.restore) {
				var restoreAndInitialRule = s.addRule(restoreClass, initialClass)
					.addProperty("position", "relative");

				if (this.__options.legacyIeSupport)
					restoreAndInitialRule.addProperty("*zoom", 1);

				s.addRule(restoreClass + " " + containerClass)
					.addProperty("padding-right", 0)
					.addProperty("margin-right", 100 - g.getRestoredContainerWidth() + "%");

				s.addRule(restoreClass + " " + initialClass)
					.addProperty("margin-right", 100 - g.getRestoredInitialWidth() + "%");
			}

			for (var i = 1; i <= gridCols; i++) {
				s.addRule(this.__getSpanClass(i))
					.addProperty("margin-right", g.getBlockWidth(i) * -1 + "%")
					.addProperty("width", g.getBlockWidth(i) + "%");

				if (this.__options.restore)
					s.addRule(this.__getSpanClass(i) + " " + restoreClass)
						.addProperty("margin-right", parseFloat((100 - g.getRestoreWidth(i)).toFixed(2)) + "%");
			}

			for (var i = 1; i <= gridCols; i++) {
				s.addRule(this.__getColClass(i))
					.addProperty("left", g.getBlockOffset(i) + "%");

				if (this.__options.restore)
					s.addRule(this.__getColClass(i) + " " + restoreClass + " " + containerClass,
						this.__getColClass(i) + " " + restoreClass + " " + initialClass)
						.addProperty("left", g.getRestoredOffset(i) + "%");
			}

			return s.toString();
		},
		__getSpanClasses: function () {
			var classes = [];
			for (var i = 1; i <= this.__grid.gridCols; i++)
				classes.push(this.__getSpanClass(i));
			return classes;
		},
		__getSpanClass: function (width) {
			return this.__prefix + "span-" + width;
		},
		__getColClass: function (offset) {
			return this.__prefix + "col-" + offset;
		}
	};

	return CssGenerator;

});