RTF.prototype._controlWordsParsers.trpaddfb = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        param = options.param;

    if (param == 0) {
        delete parseParams.styles.rows.dimensionCssRules.paddingBottom;
    }

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};