controlWordsParsers.clpadr = {
    value (options = {}) {
        var {parseParams, parseResult, param} = options;

        parseParams.styles.cells.dimensionCssRules.paddingRight = {
            value: param / 20,
            unit: "pt"
        };

        return {
            parseParams,
            parseResult
        };
    }
};