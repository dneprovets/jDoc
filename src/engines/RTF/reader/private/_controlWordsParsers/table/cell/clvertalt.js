jDoc.engines.RTF.prototype._controlWordsParsers.clvertalt = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        param = options.param;

    parseParams.styles.cells.css.verticalAlign = "top";

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};