controlWordsParsers.trspdt = {
    value (options = {}) {
        var {parseParams, parseResult, param} = options;

        parseParams.options.table.cellMarginTop = param / 20;
        parseParams.styles.cells.dimensionCssRules.paddingTop =
            parseParams.styles.cells.dimensionCssRules.paddingTop || {
                value: 0,
                unit: "pt"
            };
        parseParams.styles.cells.dimensionCssRules.paddingTop.value += parseParams.options.table.cellMarginTop;

        return {
            parseParams,
            parseResult
        };
    }
};