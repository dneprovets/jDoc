controlWordsParsers.plain = {
    value (options = {}) {
        var {parseParams, parseResult} = options,
            el = parseParams.currentTextElement || parseParams.currentTextElementParent;

        this._resetFontProperties(el);

        return {
            parseParams,
            parseResult
        };
    }
};