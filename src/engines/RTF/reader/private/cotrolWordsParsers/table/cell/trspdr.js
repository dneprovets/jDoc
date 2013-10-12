jDoc.Engines.RTF.prototype.controlWordsParsers.trspdr = function () {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        param = options.param;

    parseParams.options.table.cellMarginRight = param / 20;
    parseParams.styles.cells.dimensionCSSRules.paddingRight =
        parseParams.styles.cells.dimensionCSSRules.paddingRight || {
            value: 0,
            units: "pt"
        };
    parseParams.styles.cells.dimensionCSSRules.paddingRight.value += parseParams.options.table.cellMarginRight;

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};