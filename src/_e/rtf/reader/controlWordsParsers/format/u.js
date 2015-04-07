controlWordsParsers.u = {
    value (options = {}) {
        var {parseParams, parseResult, param} = options;

        if (parseParams.currentTextElement && param) {
            parseParams.currentTextElement.properties.textContent += String.fromCharCode(param);
        }

        return {
            parseParams,
            parseResult
        };
    }
};