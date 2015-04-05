RTF.prototype._createNewPage = {
    value (options = {}) {
        var {parseParams, parseResult} = options,
            page;

        parseResult.table = this._destroyTable(parseParams);
        parseParams.currentTextElementParent = clone(parseParams.paragraphData);
        parseParams.currentTextElement = {
            options: {},
            css: {},
            dimensionCssRules: {},
            properties: {
                textContent: ""
            }
        };
        parseParams.currentPageIndex++;
        parseParams.currentElementIndex = -1;
        parseParams.pageContentHeight = 0;

        page = copy({}, parseParams.pageData, {
            children: []
        });
        parseResult.pages[parseParams.currentPageIndex] = page;

        return {
            parseParams,
            parseResult
        };
    }
};