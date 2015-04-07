controlWordsParsers.qr = {
    value (options = {}) {
        var {parseParams, parseResult, param} = options;

        if (param !== -1) {
            parseParams.currentTextElementParent.css.textAlign = "right";
        }

        return {
            parseParams,
            parseResult
        };
    }
};