controlWordsParsers.ql = {
    value (options = {}) {
        var {parseParams, parseResult, param} = options;

        if (param !== -1) {
            parseParams.currentTextElementParent.css.textAlign = "left";
        }

        return {
            parseParams,
            parseResult
        };
    }
};