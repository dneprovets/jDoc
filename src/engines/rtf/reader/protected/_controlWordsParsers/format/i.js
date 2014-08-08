RTF.prototype._controlWordsParsers.i = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        param = options.param,
        el = parseParams.currentTextElement || parseParams.currentTextElementParent;

    if (param !== -1) {
        el.css.fontStyle = "italic";
    }

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};