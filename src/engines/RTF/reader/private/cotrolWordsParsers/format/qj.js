jDoc.Engines.RTF.prototype.controlWordsParsers.qj = function () {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        param = options.param;

    if (param !== -1) {
        parseParams.currentTextElementParent.css.textAlign = "justify";
    }

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};