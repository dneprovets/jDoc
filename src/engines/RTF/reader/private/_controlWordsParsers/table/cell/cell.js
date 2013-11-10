jDoc.engines.RTF.prototype._controlWordsParsers.cell = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        count,
        currentRowIndex,
        currentCellIndex,
        table = parseParams.table,
        page = parseResult.pages[parseParams.currentPageIndex],
        row = table ? table.body.rows[table.body.rows.length - 1] : null;

    row = row || this._initRow();

    table = table || this._initTable({
        row: row,
        parseParams: parseParams,
        parentElementsList: page.elements,
        parentElementsIndex: parseParams.currentElementIndex,
        data: parseParams.currentTextElementParent
    });

    parseParams.currentTextElementParent.css = jDoc.deepMerge(
        {},
        parseParams.currentTextElementParent.css,
        parseParams.styles.cells.css
    );

    parseParams.currentTextElementParent.dimensionCSSRules = jDoc.deepMerge(
        {},
        parseParams.currentTextElementParent.dimensionCSSRules,
        parseParams.styles.cells.dimensionCSSRules
    );

    row.cells.push(parseParams.currentTextElementParent);

    count = table.body.rows.length;
    currentRowIndex = count ? count - 1 : 0;
    count = row.cells.length;
    currentCellIndex = count ? count - 1 : 0;

    if (
        table.options.cellsWidth[currentRowIndex] &&
            table.options.cellsWidth[currentRowIndex][currentCellIndex]
    ) {
        parseParams.currentTextElementParent.dimensionCSSRules.width =
            parseParams.currentTextElementParent.dimensionCSSRules.width ||
                table.options.cellsWidth[currentRowIndex][currentCellIndex];
    }
    parseParams.currentTextElementParent = {
        options: {},
        css: {},
        dimensionCSSRules: {},
        elements: []
    };
    parseParams.currentTextElement = {
        options: {},
        css: {},
        dimensionCSSRules: {},
        properties: {
            textContent: ""
        }
    };

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};