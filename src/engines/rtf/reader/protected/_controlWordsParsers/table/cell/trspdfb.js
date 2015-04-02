RTF.prototype._controlWordsParsers.trspdfb = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        param = options.param;

    if (param === 0 && parseParams.options.table.cellMarginBottom && parseParams.styles.cells.dimensionCssRules.paddingBottom) {
        parseParams.styles.cells.dimensionCssRules.paddingBottom.value -= parseParams.options.table.cellMarginBottom;
    }

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};