jDoc.Engines.RTF.prototype.controlWordsParsers.strike = function () {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        param = options.param,
        el = parseParams.currentTextElement || parseParams.currentTextElementParent;

    if (param !== -1) {
        el.css.textDecoration = "line-through";
    }

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};