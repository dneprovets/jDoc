RTF.prototype._controlWordsParsers.expnd = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        param = options.param,
        el = parseParams.currentTextElement || parseParams.currentTextElementParent;

    if (param > 0) {
        el.dimensionCssRules.letterSpacing = {
            value: param / 4,
            unit: "pt"
        };
    }

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};