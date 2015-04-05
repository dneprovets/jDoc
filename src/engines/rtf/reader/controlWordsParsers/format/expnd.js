controlWordsParsers.expnd = {
    value (options = {}) {
        var {parseParams, parseResult, param} = options,
            el = parseParams.currentTextElement || parseParams.currentTextElementParent;

        if (param > 0) {
            el.dimensionCssRules.letterSpacing = {
                value: param / 4,
                unit: "pt"
            };
        }

        return {
            parseParams,
            parseResult
        };
    }
};