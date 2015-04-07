controlWordsParsers.brdrw = {
    value (options = {}) {
        var {parseParams, parseResult, param} = options,
            el = parseParams.currentTextElement || parseParams.currentTextElementParent;

        el.dimensionCssRules.borderWidth = {
            value: param / 20,
            unit: "pt"
        };

        return {
            parseParams,
            parseResult
        };
    }
};