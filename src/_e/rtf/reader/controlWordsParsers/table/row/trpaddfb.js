controlWordsParsers.trpaddfb = {
    value (options = {}) {
        var {parseParams, parseResult, param} = options;

        if (param == 0) {
            delete parseParams.styles.rows.dimensionCssRules.paddingBottom;
        }

        return {
            parseParams,
            parseResult
        };
    }
};