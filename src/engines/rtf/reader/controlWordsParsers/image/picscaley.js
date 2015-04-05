controlWordsParsers.picscaley = {
    value (options = {}) {
        var {parseParams, parseResult, param} = options;

        if (parseParams.currentTextElementParent.dimensionCssRules.width) {
            parseParams.currentTextElementParent.dimensionCssRules.width.value = Math.round(
                parseParams.currentTextElementParent.dimensionCssRules.width.value * param / 100
            );
        }

        return {
            parseParams,
            parseResult
        };
    }
};