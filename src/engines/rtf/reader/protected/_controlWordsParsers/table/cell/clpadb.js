RTF.prototype._controlWordsParsers.clpadb = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        param = options.param;

    parseParams.styles.cells.dimensionCssRules.paddingBottom = {
        value: param / 20,
        unit: "pt"
    };

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};