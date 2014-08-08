RTF.prototype._controlWordsParsers.picscalex = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        param = options.param;

    if (parseParams.currentTextElementParent.dimensionCSSRules.height) {
        parseParams.currentTextElementParent.dimensionCSSRules.height.value = Math.round(
            parseParams.currentTextElementParent.dimensionCSSRules.height.value * param / 100
        );
    }

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};