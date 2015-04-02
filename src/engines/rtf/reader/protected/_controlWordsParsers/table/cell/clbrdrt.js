RTF.prototype._controlWordsParsers.clbrdrt = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult;

    parseParams.styles.cells.dimensionCssRules.borderTopWidth =
        parseParams.styles.defaults.dimensionCssRules.borderWidth;
    parseParams.styles.cells.css.borderTopStyle = parseParams.styles.defaults.css.borderStyle;
    parseParams.styles.cells.css.borderTopColor = parseParams.styles.defaults.css.borderColor;

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};