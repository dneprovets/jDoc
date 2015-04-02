RTF.prototype._controlWordsParsers.trbrdrb = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult;

    parseParams.styles.table.dimensionCssRules.borderBottomWidth =
        parseParams.styles.defaults.dimensionCssRules.borderWidth;
    parseParams.styles.table.css.borderBottomStyle = parseParams.styles.defaults.css.borderStyle;
    parseParams.styles.table.css.borderBottomColor = parseParams.styles.defaults.css.borderColor;

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};