jDoc.engines.RTF.prototype._controlWordsParsers.row = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        table = parseParams.table,
        paragraphHeight,
        page = parseResult.pages[parseParams.currentPageIndex],
        row = table ? table.body.rows[table.body.rows.length - 1] : null,
        isNeedDestroy = !!row;

    if (isNeedDestroy) {
        if (parseParams.currentTextElementParent && parseParams.pageWidth && parseParams.pageHeight) {
            paragraphHeight = this._getElementHeight(parseParams.currentTextElementParent, {
                width: parseParams.pageWidth
            });

            if (parseParams.pageContentHeight + paragraphHeight > parseParams.pageHeight) {
                this._createNewPage(options);
                parseResult.pages[parseParams.currentPageIndex].elements[parseParams.currentElementIndex] =
                    parseParams.currentTextElementParent;
            }

            parseParams.pageContentHeight += paragraphHeight;
        }

        parseParams.currentElementIndex++;
        this._destroyTable(parseParams);
    }

    table = this._initTable({
        row: isNeedDestroy ? null : row,
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