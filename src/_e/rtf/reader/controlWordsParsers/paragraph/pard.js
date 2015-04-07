controlWordsParsers.pard = {
    value (options = {}) {
        var {parseParams, parseResult} = options,
            page = parseResult.pages[parseParams.currentPageIndex];

        if (parseResult.table) {
            parseResult.table = this._destroyTable(parseParams);
            parseParams.currentElementIndex++;
            parseParams.currentTextElementParent = jDoc.clone(parseParams.paragraphData);
            page.children[parseParams.currentElementIndex] = parseParams.currentTextElementParent;
            parseParams.currentTextElement = null;
        }

        return {
            parseParams,
            parseResult
        };
    }
};