RTF.prototype._controlWordsParsers["~"] = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult;

    if (parseParams.currentTextElement) {
        parseParams.currentTextElement.properties.textContent += this.nonbreakingSpace;
    }

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};