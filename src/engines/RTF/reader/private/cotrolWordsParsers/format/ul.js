jDoc.Engines.RTF.prototype.controlWordsParsers.ul = function () {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        param = options.param,
        el = parseParams.currentTextElement || parseParams.currentTextElementParent;

    if (param !== -1) {
        el.css.textDecoration = "underline";
    }

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};