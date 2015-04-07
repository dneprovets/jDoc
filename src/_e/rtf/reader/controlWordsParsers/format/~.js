controlWordsParsers["~"] = {
    value (options = {}) {
        var {parseParams, parseResult} = options;

        if (parseParams.currentTextElement) {
            parseParams.currentTextElement.properties.textContent += this.nonbreakingSpace;
        }

        return {
            parseParams,
            parseResult
        };
    }
};