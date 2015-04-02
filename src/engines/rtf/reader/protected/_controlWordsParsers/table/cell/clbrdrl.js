RTF.prototype._controlWordsParsers.clbrdrl = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult;

    parseParams.styles.cells.dimensionCssRules.borderLeftWidth =
        parseParams.styles.defaults.dimensionCssRules.borderWidth;
    parseParams.styles.cells.css.borderLeftStyle = parseParams.styles.defaults.css.borderStyle;
    parseParams.styles.cells.css.borderLeftColor = parseParams.styles.defaults.css.borderColor;

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};