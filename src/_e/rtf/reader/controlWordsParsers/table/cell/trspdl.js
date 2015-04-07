controlWordsParsers.trspdl = {
    value (options = {}) {
        var {parseParams, parseResult, param} = options;

        parseParams.options.table.cellMarginLeft = param / 20;
        parseParams.styles.cells.dimensionCssRules.paddingLeft =
            parseParams.styles.cells.dimensionCssRules.paddingLeft || {
                value: 0,
                unit: "pt"
            };

        parseParams.styles.cells.dimensionCssRules.paddingLeft.value += parseParams.options.table.cellMarginLeft;

        return {
            parseParams,
            parseResult
        };
    }
};