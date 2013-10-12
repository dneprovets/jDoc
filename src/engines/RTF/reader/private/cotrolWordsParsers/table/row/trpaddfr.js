jDoc.Engines.RTF.prototype.controlWordsParsers.trpaddfr = function () {
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