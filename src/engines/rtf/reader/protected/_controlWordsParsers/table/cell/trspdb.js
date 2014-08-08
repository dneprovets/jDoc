RTF.prototype._controlWordsParsers.trspdb = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        param = options.param;

    parseParams.options.table.cellMarginBottom = param / 20;
    parseParams.styles.cells.dimensionCSSRules.paddingBottom =
        parseParams.styles.cells.dimensionCSSRules.paddingBottom || {
            value: 0,
            unit: "pt"
        };
    parseParams.styles.cells.dimensionCSSRules.paddingBottom.value += parseParams.options.table.cellMarginBottom;

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};