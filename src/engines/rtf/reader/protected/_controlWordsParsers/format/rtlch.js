RTF.prototype._controlWordsParsers.rtlch = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult;

    parseParams.currentTextElementParent.css.direction = "rtl";

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};