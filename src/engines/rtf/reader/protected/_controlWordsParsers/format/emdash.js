RTF.prototype._controlWordsParsers.emdash = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult;

    if (parseParams.currentTextElement) {
        parseParams.currentTextElement.properties.textContent += this.getEmDash();
    }

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};