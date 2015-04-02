RTF.prototype._controlWordsParsers.trpaddft = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        param = options.param;

    if (param == 0) {
        delete parseParams.styles.rows.dimensionCssRules.paddingTop;
    }

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};