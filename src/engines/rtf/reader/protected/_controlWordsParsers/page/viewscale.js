RTF.prototype._controlWordsParsers.viewscale = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        param = options.param;

    if (param) {
        parseResult.zoom = param;
    }

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};