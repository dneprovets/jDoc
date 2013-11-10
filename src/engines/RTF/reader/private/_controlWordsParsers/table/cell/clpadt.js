jDoc.engines.RTF.prototype._controlWordsParsers.clpadt = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        param = options.param;

    parseParams.styles.cells.dimensionCSSRules.paddingTop = {
        value: param / 20,
        units: "pt"
    };

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};