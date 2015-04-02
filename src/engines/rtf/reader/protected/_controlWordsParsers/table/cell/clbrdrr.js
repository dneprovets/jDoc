RTF.prototype._controlWordsParsers.clbrdrr = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult;

    parseParams.styles.cells.dimensionCssRules.borderRightWidth =
        parseParams.styles.defaults.dimensionCssRules.borderWidth;
    parseParams.styles.cells.css.borderRightStyle = parseParams.styles.defaults.css.borderStyle;
    parseParams.styles.cells.css.borderRightColor = parseParams.styles.defaults.css.borderColor;

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};