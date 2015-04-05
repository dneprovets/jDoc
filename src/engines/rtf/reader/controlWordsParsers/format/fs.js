controlWordsParsers.fs = {
    value (options = {}) {
        var {parseParams, parseResult, param} = options,
            el = parseParams.currentTextElement || parseParams.currentTextElementParent;

        if (param !== -1) {
            el.dimensionCssRules.fontSize = {
                value: param / 2,
                unit: "pt"
            };
        }

        return {
            parseParams,
            parseResult
        };
    }
};