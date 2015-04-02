RTF.prototype._controlWordsParsers.clpadfl = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        param = options.param;

    if (param == 0) {
        delete parseParams.styles.cells.dimensionCssRules.paddingLeft;
    }

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};