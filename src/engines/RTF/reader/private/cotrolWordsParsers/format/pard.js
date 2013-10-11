jDoc.Engines.RTF.prototype.controlWordsParsers.pard = function () {
    var parseParams = options.parseParams,
        parseResult = options.parseResult;

    if (parseResult.table) {
        parseResult.table = this._destroyTable(parseParams);
        parseParams.currentElementIndex++;
        parseParams.currentTextElementParent = jDoc.clone(parseParams.paragraphData);
        page.elements[parseParams.currentElementIndex] = parseParams.currentTextElementParent;
        parseParams.currentTextElement = null;
    }
    this._resetParagraphProperties(parseParams.currentTextElementParent);

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};