RTF.prototype._controlWordsParsers.clpadfb = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        param = options.param;

    if (param == 0) {
        delete parseParams.styles.cells.dimensionCssRules.paddingBottom;
    }

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};