RTF.prototype._controlWordsParsers.fi = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        param = options.param;

    if (param > 0) {
        parseParams.currentTextElementParent.dimensionCssRules.textIndent = {
            value: param / 20,
            unit: "pt"
        };
    }

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};