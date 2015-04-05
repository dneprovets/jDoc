controlWordsParsers["'"] = {
    value (options = {}) {
        var {parseParams, parseResult, paramText = ""} = options;

        if (parseParams.currentTextElement) {
            /*if (isNaN(param)) {
             parseParams.currentTextElement.properties.textContent += this.getCharFromHex(param);
             }*/

            parseParams.currentTextElement.properties.textContent += paramText;
        }

        return {
            parseParams,
            parseResult
        };
    }
};