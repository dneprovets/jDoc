controlWordsParsers.i = {
    value (options = {}) {
        var {parseParams, parseResult, param} = options,
            el = parseParams.currentTextElement || parseParams.currentTextElementParent;

        if (param !== -1) {
            el.css.fontStyle = "italic";
        }

        return {
            parseParams,
            parseResult
        };
    }
};