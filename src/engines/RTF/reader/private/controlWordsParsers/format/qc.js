jDoc.Engines.RTF.prototype.controlWordsParsers.qc = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        param = options.param;

    if (param !== -1) {
        parseParams.currentTextElementParent.css.textAlign = "center";
    }

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};