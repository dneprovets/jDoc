RTF.prototype._controlWordsParsers.picscaley = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        param = options.param;

    if (parseParams.currentTextElementParent.dimensionCssRules.width) {
        parseParams.currentTextElementParent.dimensionCssRules.width.value = Math.round(
            parseParams.currentTextElementParent.dimensionCssRules.width.value * param / 100
        );
    }

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};