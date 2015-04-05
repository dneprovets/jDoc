controlWordsParsers.ltrch = {
    value (options = {}) {
        var {parseParams, parseResult} = options;

        parseParams.currentTextElementParent.css.direction = "ltr";

        return {
            parseParams,
            parseResult
        };
    }
};