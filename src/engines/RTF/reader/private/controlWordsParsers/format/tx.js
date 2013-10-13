jDoc.Engines.RTF.prototype.controlWordsParsers.tx = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        param = options.param;

    if (param > 0 && parseParams.currentTextElement) {
        parseParams.currentTextElement.dimensionCSSRules.paddingLeft = {
            value: param / 20,
            units: "pt"
        };
    }

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};