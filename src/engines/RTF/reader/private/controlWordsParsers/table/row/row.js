jDoc.Engines.RTF.prototype.controlWordsParsers.row = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        table = parseParams.table,
        page = parseResult.pages[parseParams.currentPageIndex],
        row = table ? table.body.rows[table.body.rows.length - 1] : null;

    row = row || this._initRow();

    table = table || this._initTable({
        table: table,
        row: row,
        parseParams: parseParams,
        parentElementsList: page.elements,
        parentElementsIndex: parseParams.currentElementIndex,
        data: parseParams.currentTextElementParent
    });

    row = this._initRow();
    table.body.rows.push(row);

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};