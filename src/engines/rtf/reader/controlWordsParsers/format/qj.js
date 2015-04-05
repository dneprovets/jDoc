controlWordsParsers.qj = {
    value (options = {}) {
        var {parseParams, parseResult, param} = options;

        if (param !== -1) {
            parseParams.currentTextElementParent.css.textAlign = "justify";
        }

        return {
            parseParams,
            parseResult
        };
    }
};