controlWordsParsers.trgaph = {
    value (options = {}) {
        var {parseParams, parseResult, param} = options;

        parseParams.styles.cells.dimensionCssRules.padding = {
            value: param / 20,
            unit: "pt"
        };

        return {
            parseParams,
            parseResult
        };
    }
};