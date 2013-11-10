jDoc.engines.RTF.prototype._controlWordsParsers.u = function (options) {
    var parseParams = options.parseParams,
        param = options.param,
        parseResult = options.parseResult;

    if (parseParams.currentTextElement && param) {
        parseParams.currentTextElement.properties.textContent += String.fromCharCode(param);
    }

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};