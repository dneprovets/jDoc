controlWordsParsers.clpadt = {
    value (options = {}) {
        var {parseParams, parseResult, param} = options;

        parseParams.styles.cells.dimensionCssRules.paddingTop = {
            value: param / 20,
            unit: "pt"
        };

        return {
            parseParams,
            parseResult
        };
    }
};