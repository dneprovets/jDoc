controlWordsParsers.trspdfl = {
    value (options = {}) {
        var {parseParams, parseResult, param} = options;

        if (param === 0 && parseParams.options.table.cellMarginLeft && parseParams.styles.cells.dimensionCssRules.paddingLeft) {
            parseParams.styles.cells.dimensionCssRules.paddingLeft.value -= parseParams.options.table.cellMarginLeft;
        }

        return {
            parseParams,
            parseResult
        };
    }
};