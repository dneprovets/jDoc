controlWordsParsers.trpaddfr = {
    value (options = {}) {
        var {parseParams, parseResult, param} = options;

        if (param == 0) {
            delete parseParams.styles.rows.dimensionCssRules.paddingRight;
        }

        return {
            parseParams,
            parseResult
        };
    }
};