controlWordsParsers.sl = {
    value (options = {}) {
        var {parseParams, parseResult} = options,
            param = (options.param && options.param !== -1) || 0,
            el = parseParams.currentTextElement || parseParams.currentTextElementParent;

        if (param > 0) {
            param /= 20;

            if (!el.dimensionCssRules.fontSize || this.getMaxFontSize(el) <= param) {
                el.dimensionCssRules.lineHeight = {
                    value: param,
                    unit: "pt"
                };
            }
        } else if (param < 0) {
            el.dimensionCssRules.lineHeight = {
                value: Math.abs(param) / 20,
                unit: "pt"
            };
        }

        return {
            parseParams,
            parseResult
        };
    }
};