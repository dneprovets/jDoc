controlWordsParsers.qc = {
    value (options = {}) {
        var {parseParams, parseResult, param} = options;

        if (param !== -1) {
            parseParams.currentTextElementParent.css.textAlign = "center";
        }

        return {
            parseParams,
            parseResult
        };
    }
};