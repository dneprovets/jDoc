jDoc.Engines.RTF.prototype.controlWordsParsers.trspdfb = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        param = options.param;

    if (param === 0 && parseParams.options.table.cellMarginBottom && parseParams.styles.cells.dimensionCSSRules.paddingBottom) {
        parseParams.styles.cells.dimensionCSSRules.paddingBottom.value -= parseParams.options.table.cellMarginBottom;
    }

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};