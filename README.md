# AnyGrid

Fluid CSS grid and generator

## Creating grid for your site

Just go to [outring.github.io/anygrid](http://outring.github.io/anygrid/)

## Hacking generator

### Installation

```
npm install anygrid
```

### Usage

```js
var anygrid = require('anygrid');

var containerColumnsCount = 5;
var gridColumnsCount = 12;
var gutterWidth = 5;

/**
 * Create GridBuilder instance
 *
 * containerColumnsCount (optional, default is 5)
 *     Number of container columns
 *     Container columns ≠ number of grid columns
 *     Can't be larger than grid columns
 *     Too small number will cause not very precise appearance in IE<8 and WebKit browsers
 *     100 % containerColumnsCount must be 0
 */
var builder = new anygrid.GridBuilder(containerColumnsCount);

/**
 * Create grid
 *
 * gridColumnsCount
 *     Number of grid columns
 *     Can't be smaller than containerColumnsCount
 *
 * gutterWidth
 *     Conainer-relative gutter width
 *     From 0 to builder.getMaxGutterWidth()
 */
var grid = builder.getGrid(gridColumnsCount, gutterWidth);

/** Create generator */
var cssGenerator = new anygrid.CssGenerator(grid, { prefix: 'g-', legacyIeSupport: true, restore: true });

/** Grab the CSS grid code */
cssGenerator.getCode();
```
