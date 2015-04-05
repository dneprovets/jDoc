controlWordsParsers.cellx = {
    value (options = {}) {
        var {parseParams, parseResult, param} = options,
            count,
            currentRowIndex,
            table = parseParams.table,
            page = parseResult.pages[parseParams.currentPageIndex],
            body = table ? this._getTableBody(table) : null,
            row = table ? body.children[body.children.length - 1] : null;

        row = row || this._initRow();

        if (!table) {
            table = this._initTable({
                row: row,
                parseParams,
                parentElementsList: page.children,
                parentElementsIndex: parseParams.currentElementIndex,
                data: parseParams.currentTextElementParent
            });
            body = this._getTableBody(table);
        }

        count = body.children.length;
        currentRowIndex = count ? count - 1 : 0;

        table.options.cellsWidth[currentRowIndex] = table.options.cellsWidth[currentRowIndex] || [];
        table.options.cellsWidth[currentRowIndex].push({
            value: param / 20,
            unit: "pt"
        });

        return {
            parseParams,
            parseResult
        };
    }
};