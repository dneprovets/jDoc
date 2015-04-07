controlWordsParsers['super'] = {
    value (options = {}) {
        var {parseParams, parseResult} = options,
            el = parseParams.currentTextElement || parseParams.currentTextElementParent;

        el.css.verticalAlign = "super";

        return {
            parseParams,
            parseResult
        };
    }
};