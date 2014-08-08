RTF.prototype._controlWordsParsers.clvertalc = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        param = options.param;

    parseParams.styles.cells.css.verticalAlign = "middle";

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};