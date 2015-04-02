RTF.prototype._controlWordsParsers.clpadr = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        param = options.param;

    parseParams.styles.cells.dimensionCssRules.paddingRight = {
        value: param / 20,
        unit: "pt"
    };

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};