controlWordsParsers.trpaddft = {
    value (options = {}) {
        var {parseParams, parseResult, param} = options;

        if (param == 0) {
            delete parseParams.styles.rows.dimensionCssRules.paddingTop;
        }

        return {
            parseParams,
            parseResult
        };
    }
};