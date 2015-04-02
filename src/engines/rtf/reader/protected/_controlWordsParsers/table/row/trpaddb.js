RTF.prototype._controlWordsParsers.trpaddb = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        param = options.param;

    if (param > 0) {
        parseParams.styles.rows.dimensionCssRules.paddingBottom = {
            value: param / 20,
            unit: "pt"
        };
    }

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};