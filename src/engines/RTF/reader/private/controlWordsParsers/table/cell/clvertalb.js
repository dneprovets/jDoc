jDoc.Engines.RTF.prototype.controlWordsParsers.clvertalb = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        param = options.param;

    parseParams.styles.cells.css.verticalAlign = "bottom";

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};