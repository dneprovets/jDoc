jDoc.engines.RTF.prototype._controlWordsParsers.brdrs = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        el = parseParams.currentTextElement || parseParams.currentTextElementParent;

    el.css.borderStyle = "solid";

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};