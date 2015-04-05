controlWordsParsers.picwgoal = {
    value (options = {}) {
        var {parseParams, parseResult, param} = options;

        if (param > 0) {
            parseParams.currentTextElementParent.dimensionCssRules.width = {
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