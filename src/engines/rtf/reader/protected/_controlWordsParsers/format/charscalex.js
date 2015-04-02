RTF.prototype._controlWordsParsers.charscalex = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        fontSize,
        param = options.param;

    if (parseParams.currentTextElement && parseParams.currentTextElement.dimensionCssRules.fontSize) {
        fontSize = parseParams.currentTextElement.dimensionCssRules.fontSize;
    } else if (parseParams.currentTextElementParent && parseParams.currentTextElementParent.dimensionCssRules.fontSize) {
        fontSize = parseParams.currentTextElementParent.dimensionCssRules.fontSize;
    }

    if (fontSize) {
        fontSize.value = Math.round(fontSize.value * param / 100);
    }

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};