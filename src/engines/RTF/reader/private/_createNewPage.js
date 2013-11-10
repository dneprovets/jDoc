jDoc.engines.RTF.prototype._createNewPage = function (options) {
    var parseParams = options.parseParams,
        page,
        parseResult = options.parseResult;

    parseResult.table = this._destroyTable(parseParams);
    parseParams.currentTextElementParent = jDoc.clone(parseParams.paragraphData);
    parseParams.currentTextElement = {
        options: {},
        css: {},
        dimensionCSSRules: {},
        properties: {
            textContent: ""
        }
    };
    parseParams.currentPageIndex++;
    parseParams.currentElementIndex = -1;
    parseParams.pageContentHeight = 0;

    page = jDoc.deepMerge({}, parseParams.pageData, {
        elements: []
    });
    parseResult.pages[parseParams.currentPageIndex] = page;

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};