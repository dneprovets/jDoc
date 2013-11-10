jDoc.engines.RTF.prototype._controlWordsParsers.pard = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        page = parseResult.pages[parseParams.currentPageIndex];

    if (parseResult.table) {
        parseResult.table = this._destroyTable(parseParams);
        parseParams.currentElementIndex++;
        parseParams.currentTextElementParent = jDoc.clone(parseParams.paragraphData);
        page.elements[parseParams.currentElementIndex] = parseParams.currentTextElementParent;
        parseParams.currentTextElement = null;
    }

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};