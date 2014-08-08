RTF.prototype._controlWordsParsers.clpadl = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        param = options.param;

    parseParams.styles.cells.dimensionCSSRules.paddingLeft = {
        value: param / 20,
        unit: "pt"
    };

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};