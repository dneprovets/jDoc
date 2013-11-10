jDoc.engines.RTF.prototype._controlWordsParsers.trpaddt = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        param = options.param;

    if (param > 0) {
        parseParams.styles.rows.dimensionCSSRules.paddingTop = {
            value: param / 20,
            units: "pt"
        };
    }

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};