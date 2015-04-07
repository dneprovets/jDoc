controlWordsParsers.clpadfl = {
    value (options = {}) {
        var {parseParams, parseResult, param} = options;

        if (param == 0) {
            delete parseParams.styles.cells.dimensionCssRules.paddingLeft;
        }

        return {
            parseParams,
            parseResult
        };
    }
};