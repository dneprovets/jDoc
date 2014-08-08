RTF.prototype._controlWordsParsers.page = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult;

    this._createNewPage(options);

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};