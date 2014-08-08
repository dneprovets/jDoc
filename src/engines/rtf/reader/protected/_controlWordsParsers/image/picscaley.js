RTF.prototype._controlWordsParsers.picscaley = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        param = options.param;

    if (parseParams.currentTextElementParent.dimensionCSSRules.width) {
        parseParams.currentTextElementParent.dimensionCSSRules.width.value = Math.round(
            parseParams.currentTextElementParent.dimensionCSSRules.width.value * param / 100
        );
    }

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};