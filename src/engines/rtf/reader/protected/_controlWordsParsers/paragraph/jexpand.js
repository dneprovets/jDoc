RTF.prototype._controlWordsParsers.jexpand = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult;

    if (parseParams.currentTextElementParent) {
        parseParams.currentTextElementParent.css.textAlign = "justify";
    }

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};