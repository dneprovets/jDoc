controlWordsParsers.clpadl = {
    value (options = {}) {
        var {parseParams, parseResult, param} = options;

        parseParams.styles.cells.dimensionCssRules.paddingLeft = {
            value: param / 20,
            unit: "pt"
        };

        return {
            parseParams,
            parseResult
        };
    }
};