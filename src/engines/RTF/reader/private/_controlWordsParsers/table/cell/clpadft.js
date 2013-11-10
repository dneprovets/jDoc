jDoc.engines.RTF.prototype._controlWordsParsers.clpadft = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        param = options.param;

    if (param == 0) {
        delete parseParams.styles.cells.dimensionCSSRules.paddingTop;
    }

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};