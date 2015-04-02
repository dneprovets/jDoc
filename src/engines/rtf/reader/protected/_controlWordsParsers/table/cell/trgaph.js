RTF.prototype._controlWordsParsers.trgaph = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        param = options.param;

    parseParams.styles.cells.dimensionCssRules.padding = {
        value: param / 20,
        unit: "pt"
    };

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};