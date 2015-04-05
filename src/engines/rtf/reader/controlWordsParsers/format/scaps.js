controlWordsParsers.scaps = {
    value (options = {}) {
        var {parseParams, parseResult, param} = options,
            el = parseParams.currentTextElement || parseParams.currentTextElementParent;

        if (param !== -1) {
            el.css.fontVariant = "small-caps";
        }

        return {
            parseParams,
            parseResult
        };
    }
};