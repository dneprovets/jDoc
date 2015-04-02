RTF.prototype._controlWordsParsers.fs = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        param = options.param,
        el = parseParams.currentTextElement || parseParams.currentTextElementParent;

    if (param !== -1) {
        el.dimensionCssRules.fontSize = {
            value: param / 2,
            unit: "pt"
        };
    }

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};