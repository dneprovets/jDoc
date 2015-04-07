controlWordsParsers.trspdfr = {
    value (options = {}) {
        var {parseParams, parseResult, param} = options;

        if (param === 0 && parseParams.options.table.cellMarginRight && parseParams.styles.cells.dimensionCssRules.paddingRight) {
            parseParams.styles.cells.dimensionCssRules.paddingRight.value -= parseParams.options.table.cellMarginRight;
        }

        return {
            parseParams,
            parseResult
        };
    }
};