controlWordsParsers.trpaddt = {
    value (options = {}) {
        var {parseParams, parseResult, param} = options;

        if (param > 0) {
            parseParams.styles.rows.dimensionCssRules.paddingTop = {
                value: param / 20,
                unit: "pt"
            };
        }

        return {
            parseParams,
            parseResult
        };
    }
};