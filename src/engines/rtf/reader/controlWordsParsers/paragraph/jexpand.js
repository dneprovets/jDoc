controlWordsParsers.jexpand = {
    value (options = {}) {
        var {parseParams, parseResult} = options;

        if (parseParams.currentTextElementParent) {
            parseParams.currentTextElementParent.css.textAlign = "justify";
        }

        return {
            parseParams,
            parseResult
        };
    }
};