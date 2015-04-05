controlWordsParsers.picscalex = {
    value (options = {}) {
        var {parseParams, parseResult, param} = options;

        if (parseParams.currentTextElementParent.dimensionCssRules.height) {
            parseParams.currentTextElementParent.dimensionCssRules.height.value = Math.round(
                parseParams.currentTextElementParent.dimensionCssRules.height.value * param / 100
            );
        }

        return {
            parseParams,
            parseResult
        };
    }
};