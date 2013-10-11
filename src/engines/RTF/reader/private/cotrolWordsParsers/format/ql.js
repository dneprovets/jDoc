jDoc.Engines.RTF.prototype.controlWordsParsers.ql = function () {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        param = options.param;

    if (param !== -1) {
        parseParams.currentTextElementParent.css.textAlign = "left";
    }

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};