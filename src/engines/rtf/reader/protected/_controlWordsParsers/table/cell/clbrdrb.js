RTF.prototype._controlWordsParsers.clbrdrb = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult;

    parseParams.styles.cells.dimensionCssRules.borderBottomWidth =
        parseParams.styles.defaults.dimensionCssRules.borderWidth;
    parseParams.styles.cells.css.borderBottomStyle = parseParams.styles.defaults.css.borderStyle;
    parseParams.styles.cells.css.borderBottomColor = parseParams.styles.defaults.css.borderColor;

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};