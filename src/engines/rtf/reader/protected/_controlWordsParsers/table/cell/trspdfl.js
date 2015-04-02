RTF.prototype._controlWordsParsers.trspdfl = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        param = options.param;

    if (param === 0 && parseParams.options.table.cellMarginLeft && parseParams.styles.cells.dimensionCssRules.paddingLeft) {
        parseParams.styles.cells.dimensionCssRules.paddingLeft.value -= parseParams.options.table.cellMarginLeft;
    }

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};