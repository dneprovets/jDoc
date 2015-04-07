controlWordsParsers.trspdfb = {
    value (options = {}) {
        var {parseParams, parseResult, param} = options;

        if (param === 0 && parseParams.options.table.cellMarginBottom && parseParams.styles.cells.dimensionCssRules.paddingBottom) {
            parseParams.styles.cells.dimensionCssRules.paddingBottom.value -= parseParams.options.table.cellMarginBottom;
        }

        return {
            parseParams,
            parseResult
        };
    }
};