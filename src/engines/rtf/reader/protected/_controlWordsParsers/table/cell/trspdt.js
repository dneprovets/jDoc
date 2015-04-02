RTF.prototype._controlWordsParsers.trspdt = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        param = options.param;

    parseParams.options.table.cellMarginTop = param / 20;
    parseParams.styles.cells.dimensionCssRules.paddingTop =
        parseParams.styles.cells.dimensionCssRules.paddingTop || {
            value: 0,
            unit: "pt"
        };
    parseParams.styles.cells.dimensionCssRules.paddingTop.value += parseParams.options.table.cellMarginTop;

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};