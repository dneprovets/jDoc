RTF.prototype._controlWordsParsers['super'] = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        el = parseParams.currentTextElement || parseParams.currentTextElementParent;

    el.css.verticalAlign = "super";

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};