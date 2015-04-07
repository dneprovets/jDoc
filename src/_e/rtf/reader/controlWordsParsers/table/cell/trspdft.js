controlWordsParsers.trspdft = {
    value (options = {}) {
        var {parseParams, parseResult, param} = options;

        if (param === 0 && parseParams.options.table.cellMarginTop && parseParams.styles.cells.dimensionCssRules.paddingTop) {
            parseParams.styles.cells.dimensionCssRules.paddingTop.value -= parseParams.options.table.cellMarginTop;
        }

        return {
            parseParams,
            parseResult
        };
    }
};