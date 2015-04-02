RTF.prototype._controlWordsParsers.cell = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        count,
        currentRowIndex,
        currentCellIndex,
        table = parseParams.table,
        page = parseResult.pages[parseParams.currentPageIndex],
        body = table ? this._getTableBody(table) : null,
        row = body ? body[body.children.length - 1] : null;

    row = row || this._initRow();

    if (!table) {
        table = this._initTable({
            row: row,
            parseParams: parseParams,
            parentElementsList: page.children,
            parentElementsIndex: parseParams.currentElementIndex,
            data: parseParams.currentTextElementParent
        });
        body = this._getTableBody(table);
    }

    parseParams.currentTextElementParent.css = copy(
        {},
        parseParams.currentTextElementParent.css,
        parseParams.styles.cells.css
    );

    parseParams.currentTextElementParent.dimensionCssRules = copy(
        {},
        parseParams.currentTextElementParent.dimensionCssRules,
        parseParams.styles.cells.dimensionCssRules
    );

    row.children.push(parseParams.currentTextElementParent);

    count = body.children.length;
    currentRowIndex = count ? count - 1 : 0;
    count = row.children.length;
    currentCellIndex = count ? count - 1 : 0;

    if (
        table.options.cellsWidth[currentRowIndex] &&
            table.options.cellsWidth[currentRowIndex][currentCellIndex]
    ) {
        parseParams.currentTextElementParent.dimensionCssRules.width =
            parseParams.currentTextElementParent.dimensionCssRules.width ||
                table.options.cellsWidth[currentRowIndex][currentCellIndex];
    }
    parseParams.currentTextElementParent = {
        options: {},
        css: {},
        dimensionCssRules: {},
        children: []
    };
    parseParams.currentTextElement = {
        options: {},
        css: {},
        dimensionCssRules: {},
        properties: {
            textContent: ""
        }
    };

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};