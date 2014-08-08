RTF.prototype._controlWordsParsers.row = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        table = parseParams.table,
        paragraphHeight,
        page = parseResult.pages[parseParams.currentPageIndex],
        body = table ? this._getTableBody(table) : null,
        row = body ? body.children[body.children.length - 1] : null,
        isNeedDestroy = !!row;

    if (isNeedDestroy) {
        if (parseParams.currentTextElementParent && parseParams.pageWidth && parseParams.pageHeight) {
            paragraphHeight = this._getElementHeight(parseParams.currentTextElementParent, {
                width: parseParams.pageWidth
            });

            if (parseParams.pageContentHeight + paragraphHeight > parseParams.pageHeight) {
                this._createNewPage(options);
                parseResult.pages[parseParams.currentPageIndex].children[parseParams.currentElementIndex] =
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
        parentElementsList: page.children,
        parentElementsIndex: parseParams.currentElementIndex,
        data: parseParams.currentTextElementParent
    });
    body = this._getTableBody(table);

    row = this._initRow();
    body.children.push(row);

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};