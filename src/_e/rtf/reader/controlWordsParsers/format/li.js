controlWordsParsers.li = {
    value (options = {}) {
        var {parseParams, parseResult, param} = options;

        if (param > 0) {
            parseParams.currentTextElementParent.dimensionCssRules.paddingLeft = {
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