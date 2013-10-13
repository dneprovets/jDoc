jDoc.Engines.RTF.prototype.controlWordsParsers["~"] = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult;

    if (parseParams.currentTextElement) {
        parseParams.currentTextElement.properties.textContent += this._getNonbreakingSpace();
    }

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};