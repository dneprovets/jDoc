RTF.prototype._controlWordsParsers.clpadfr = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        param = options.param;

    if (param == 0) {
        delete parseParams.styles.cells.dimensionCssRules.paddingRight;
    }

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};