RTF.prototype._controlWordsParsers.trspdl = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        param = options.param;

    parseParams.options.table.cellMarginLeft = param / 20;
    parseParams.styles.cells.dimensionCSSRules.paddingLeft =
        parseParams.styles.cells.dimensionCSSRules.paddingLeft || {
            value: 0,
            unit: "pt"
        };

    parseParams.styles.cells.dimensionCSSRules.paddingLeft.value += parseParams.options.table.cellMarginLeft;

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};