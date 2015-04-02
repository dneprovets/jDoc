RTF.prototype._controlWordsParsers.trspdfr = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        param = options.param;

    if (param === 0 && parseParams.options.table.cellMarginRight && parseParams.styles.cells.dimensionCssRules.paddingRight) {
        parseParams.styles.cells.dimensionCssRules.paddingRight.value -= parseParams.options.table.cellMarginRight;
    }

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};