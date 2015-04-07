controlWordsParsers.pichgoal = {
    value (options = {}) {
        var {parseParams, parseResult, param} = options;

        if (param > 0) {
            parseParams.currentTextElementParent.dimensionCssRules.height = {
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