controlWordsParsers.trpaddfl = {
    value (options = {}) {
        var {parseParams, parseResult, param} = options;

        if (param == 0) {
            delete parseParams.styles.rows.dimensionCssRules.paddingLeft;
        }

        return {
            parseParams,
            parseResult
        };
    }
};