controlWordsParsers.brdrs = {
    value (options = {}) {
        var {parseParams, parseResult} = options,
            el = parseParams.currentTextElement || parseParams.currentTextElementParent;

        el.css.borderStyle = "solid";

        return {
            parseParams,
            parseResult
        };
    }
};