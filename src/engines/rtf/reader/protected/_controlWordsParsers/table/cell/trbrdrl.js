RTF.prototype._controlWordsParsers.trbrdrl = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult;

    parseParams.styles.table.dimensionCssRules.borderLeftWidth =
        parseParams.styles.defaults.dimensionCssRules.borderWidth;
    parseParams.styles.table.css.borderLeftStyle = parseParams.styles.defaults.css.borderStyle;
    parseParams.styles.table.css.borderLeftColor = parseParams.styles.defaults.css.borderColor;

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};