RTF.prototype._controlWordsParsers.sl = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        param = (options.param !== -1 && options.param) || 0,
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
        parseParams: parseParams,
        parseResult: parseResult
    };
};