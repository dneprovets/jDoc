jDoc.Engines.RTF.prototype.controlWordsParsers.b = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        param = options.param,
        el = parseParams.currentTextElement || parseParams.currentTextElementParent;

    if (param !== -1) {
        el.css.fontWeight = "bold";
    }

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};