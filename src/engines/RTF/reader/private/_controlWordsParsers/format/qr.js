jDoc.engines.RTF.prototype._controlWordsParsers.qr = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        param = options.param;

    if (param !== -1) {
        parseParams.currentTextElementParent.css.textAlign = "right";
    }

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};