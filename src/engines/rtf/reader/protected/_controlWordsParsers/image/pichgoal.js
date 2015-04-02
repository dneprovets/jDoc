RTF.prototype._controlWordsParsers.pichgoal = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        param = options.param;

    if (param > 0) {
        parseParams.currentTextElementParent.dimensionCssRules.height = {
            value: param / 20,
            unit: "pt"
        };
    }

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};