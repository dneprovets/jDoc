jDoc.Engines.RTF.prototype.controlWordsParsers.li = function () {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        param = options.param;

    if (param > 0) {
        parseParams.currentTextElementParent.dimensionCSSRules.paddingLeft = {
            value: param / 20,
            units: "pt"
        };
    }

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};