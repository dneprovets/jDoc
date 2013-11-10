jDoc.engines.RTF.prototype._controlWordsParsers.endash = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult;

    if (parseParams.currentTextElement) {
        parseParams.currentTextElement.properties.textContent += this._getEnDash();
    }

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};