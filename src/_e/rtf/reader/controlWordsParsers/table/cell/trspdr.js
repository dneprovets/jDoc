controlWordsParsers.trspdr = {
    value (options = {}) {
        var {parseParams, parseResult, param} = options;

        parseParams.options.table.cellMarginRight = param / 20;
        parseParams.styles.cells.dimensionCssRules.paddingRight =
            parseParams.styles.cells.dimensionCssRules.paddingRight || {
                value: 0,
                unit: "pt"
            };
        parseParams.styles.cells.dimensionCssRules.paddingRight.value += parseParams.options.table.cellMarginRight;

        return {
            parseParams,
            parseResult
        };
    }
};