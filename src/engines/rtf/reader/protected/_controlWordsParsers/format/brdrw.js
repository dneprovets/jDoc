RTF.prototype._controlWordsParsers.brdrw = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        param = options.param,
        el = parseParams.currentTextElement || parseParams.currentTextElementParent;

    el.dimensionCssRules.borderWidth = {
        value: param / 20,
        unit: "pt"
    };

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};