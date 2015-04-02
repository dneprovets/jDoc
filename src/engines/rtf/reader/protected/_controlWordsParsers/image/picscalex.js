RTF.prototype._controlWordsParsers.picscalex = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        param = options.param;

    if (parseParams.currentTextElementParent.dimensionCssRules.height) {
        parseParams.currentTextElementParent.dimensionCssRules.height.value = Math.round(
            parseParams.currentTextElementParent.dimensionCssRules.height.value * param / 100
        );
    }

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};