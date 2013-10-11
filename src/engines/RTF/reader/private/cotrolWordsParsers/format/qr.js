jDoc.Engines.RTF.prototype.controlWordsParsers.qr = function () {
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