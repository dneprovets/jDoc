controlWordsParsers.endash = {
    value (options = {}) {
        var {parseParams, parseResult} = options;

        if (parseParams.currentTextElement) {
            parseParams.currentTextElement.properties.textContent += this.enDash;
        }

        return {
            parseParams,
            parseResult
        };
    }
};