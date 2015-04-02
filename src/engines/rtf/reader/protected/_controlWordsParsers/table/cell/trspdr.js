RTF.prototype._controlWordsParsers.trspdr = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        param = options.param;

    parseParams.options.table.cellMarginRight = param / 20;
    parseParams.styles.cells.dimensionCssRules.paddingRight =
        parseParams.styles.cells.dimensionCssRules.paddingRight || {
            value: 0,
            unit: "pt"
        };
    parseParams.styles.cells.dimensionCssRules.paddingRight.value += parseParams.options.table.cellMarginRight;

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};