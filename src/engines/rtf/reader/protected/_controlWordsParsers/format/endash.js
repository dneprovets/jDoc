RTF.prototype._controlWordsParsers.endash = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult;

    if (parseParams.currentTextElement) {
        parseParams.currentTextElement.properties.textContent += this.enDash;
    }

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};