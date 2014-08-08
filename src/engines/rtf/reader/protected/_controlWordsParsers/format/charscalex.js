RTF.prototype._controlWordsParsers.charscalex = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        fontSize,
        param = options.param;

    if (parseParams.currentTextElement && parseParams.currentTextElement.dimensionCSSRules.fontSize) {
        fontSize = parseParams.currentTextElement.dimensionCSSRules.fontSize;
    } else if (parseParams.currentTextElementParent && parseParams.currentTextElementParent.dimensionCSSRules.fontSize) {
        fontSize = parseParams.currentTextElementParent.dimensionCSSRules.fontSize;
    }

    if (fontSize) {
        fontSize.value = Math.round(fontSize.value * param / 100);
    }

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};