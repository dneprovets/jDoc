controlWordsParsers.charscalex = {
    value (options = {}) {
        var {parseParams, parseResult, param} = options,
            fontSize;

        if (parseParams.currentTextElement && parseParams.currentTextElement.dimensionCssRules.fontSize) {
            fontSize = parseParams.currentTextElement.dimensionCssRules.fontSize;
        } else if (parseParams.currentTextElementParent && parseParams.currentTextElementParent.dimensionCssRules.fontSize) {
            fontSize = parseParams.currentTextElementParent.dimensionCssRules.fontSize;
        }

        if (fontSize) {
            fontSize.value = Math.round(fontSize.value * param / 100);
        }

        return {
            parseParams,
            parseResult
        };
    }
};