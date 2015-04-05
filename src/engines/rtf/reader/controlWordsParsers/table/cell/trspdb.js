controlWordsParsers.trspdb = {
    value (options = {}) {
        var {parseParams, parseResult, param} = options;

        parseParams.options.table.cellMarginBottom = param / 20;
        parseParams.styles.cells.dimensionCssRules.paddingBottom =
            parseParams.styles.cells.dimensionCssRules.paddingBottom || {
                value: 0,
                unit: "pt"
            };
        parseParams.styles.cells.dimensionCssRules.paddingBottom.value += parseParams.options.table.cellMarginBottom;

        return {
            parseParams,
            parseResult
        };
    }
};