RTF.prototype._controlWordsParsers.trspdft = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        param = options.param;

    if (param === 0 && parseParams.options.table.cellMarginTop && parseParams.styles.cells.dimensionCSSRules.paddingTop) {
        parseParams.styles.cells.dimensionCSSRules.paddingTop.value -= parseParams.options.table.cellMarginTop;
    }

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};