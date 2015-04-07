controlWordsParsers.clpadfb = {
    value (options = {}) {
        var {parseParams, parseResult, param} = options;

        if (param == 0) {
            delete parseParams.styles.cells.dimensionCssRules.paddingBottom;
        }

        return {
            parseParams,
            parseResult
        };
    }
};