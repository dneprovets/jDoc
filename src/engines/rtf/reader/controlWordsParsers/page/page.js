controlWordsParsers.page = {
    value (options = {}) {
        var {parseParams, parseResult} = options;

        this._createNewPage(options);

        return {
            parseParams,
            parseResult
        };
    }
};