RTF.prototype._controlWordsParsers.trpaddfl = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        param = options.param;

    if (param == 0) {
        delete parseParams.styles.rows.dimensionCssRules.paddingLeft;
    }

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};