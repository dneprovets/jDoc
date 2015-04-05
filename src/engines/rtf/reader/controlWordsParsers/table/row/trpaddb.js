controlWordsParsers.trpaddb = {
    value (options = {}) {
        var {parseParams, parseResult, param} = options;

        if (param > 0) {
            parseParams.styles.rows.dimensionCssRules.paddingBottom = {
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