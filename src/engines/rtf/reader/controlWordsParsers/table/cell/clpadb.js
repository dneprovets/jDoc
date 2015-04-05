controlWordsParsers.clpadb = {
    value (options = {}) {
        var {parseParams, parseResult, param} = options;

        parseParams.styles.cells.dimensionCssRules.paddingBottom = {
            value: param / 20,
            unit: "pt"
        };

        return {
            parseParams,
            parseResult
        };
    }
};