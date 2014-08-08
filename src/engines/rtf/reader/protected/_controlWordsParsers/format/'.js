RTF.prototype._controlWordsParsers["'"] = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        paramText = options.paramText || "",
        param = options.param;

    if (parseParams.currentTextElement) {
        /*if (isNaN(param)) {
            parseParams.currentTextElement.properties.textContent += this.getCharFromHex(param);
        }*/

        parseParams.currentTextElement.properties.textContent += paramText;
    }

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};