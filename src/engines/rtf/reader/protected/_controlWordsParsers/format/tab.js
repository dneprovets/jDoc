RTF.prototype._controlWordsParsers.tab = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult;

    if (parseParams.currentTextElement) {
        parseParams.currentTextElement.properties.textContent += this.getTabAsSpaces();
    }

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};