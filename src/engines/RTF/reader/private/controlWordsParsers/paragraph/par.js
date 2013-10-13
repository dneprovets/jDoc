jDoc.Engines.RTF.prototype.controlWordsParsers.par = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult;

    parseParams.currentElementIndex++;

    /**
     * inherit previous paragraph
     * @type {*}
     */
    parseParams.currentTextElementParent = jDoc.deepMerge({}, (
        (
            parseParams.currentTextElementParent && parseParams.currentTextElementParent.options.isParagraph
        ) ? parseParams.currentTextElementParent : parseParams.paragraphData
    ), {
        elements: []
    });

    parseResult.pages[parseParams.currentPageIndex].elements[parseParams.currentElementIndex] =
        parseParams.currentTextElementParent;

    parseParams.currentTextElement = null;

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};