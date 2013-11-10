jDoc.engines.RTF.prototype._controlWordsParsers.trpaddfr = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        param = options.param;

    if (param == 0) {
        delete parseParams.styles.rows.dimensionCSSRules.paddingRight;
    }

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};