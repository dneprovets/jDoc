RTF.prototype._controlWordsParsers.trbrdrr = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult;

    parseParams.styles.table.dimensionCSSRules.borderRightWidth =
        parseParams.styles.defaults.dimensionCSSRules.borderWidth;
    parseParams.styles.table.css.borderRightStyle = parseParams.styles.defaults.css.borderStyle;
    parseParams.styles.table.css.borderRightColor = parseParams.styles.defaults.css.borderColor;

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};