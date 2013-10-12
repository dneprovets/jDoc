jDoc.Engines.RTF.prototype.controlWordsParsers.trspdt = function () {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        param = options.param;

    parseParams.options.table.cellMarginTop = param / 20;
    parseParams.styles.cells.dimensionCSSRules.paddingTop =
        parseParams.styles.cells.dimensionCSSRules.paddingTop || {
            value: 0,
            units: "pt"
        };
    parseParams.styles.cells.dimensionCSSRules.paddingTop.value += parseParams.options.table.cellMarginTop;

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};