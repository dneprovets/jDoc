controlWordsParsers.tab = {
    value (options = {}) {
        var {parseParams, parseResult} = options;

        if (parseParams.currentTextElement) {
            parseParams.currentTextElement.properties.textContent += this.tabAsSpaces;
        }

        return {
            parseParams,
            parseResult
        };
    }
};