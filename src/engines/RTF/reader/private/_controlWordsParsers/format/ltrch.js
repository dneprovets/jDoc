jDoc.engines.RTF.prototype._controlWordsParsers.ltrch = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult;

    parseParams.currentTextElementParent.css.direction = "ltr";

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};