jDoc.Engines.RTF.prototype.controlWordsParsers.scaps = function () {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        param = options.param,
        el = parseParams.currentTextElement || parseParams.currentTextElementParent;

    if (param !== -1) {
        el.css.fontVariant = "small-caps";
    }

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};