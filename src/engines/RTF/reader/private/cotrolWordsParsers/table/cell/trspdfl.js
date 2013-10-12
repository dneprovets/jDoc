jDoc.Engines.RTF.prototype.controlWordsParsers.trspdfl = function () {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        param = options.param;

    if (param === 0 && parseParams.options.table.cellMarginLeft && parseParams.styles.cells.dimensionCSSRules.paddingLeft) {
        parseParams.styles.cells.dimensionCSSRules.paddingLeft.value -= parseParams.options.table.cellMarginLeft;
    }

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};