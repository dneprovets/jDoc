jDoc.Engines.RTF.prototype.controlWordsParsers["'"] = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        param = options.param;

    if (parseParams.currentTextElement && isNaN(param)) {
        parseParams.currentTextElement.properties.textContent += this._getCharFromHex(param);
    }

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};