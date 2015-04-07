controlWordsParsers.rtlch = {
    value (options = {}) {
        var {parseParams, parseResult} = options;

        parseParams.currentTextElementParent.css.direction = "rtl";

        return {
            parseParams,
            parseResult
        };
    }
};