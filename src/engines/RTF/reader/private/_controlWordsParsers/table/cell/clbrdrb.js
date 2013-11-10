jDoc.engines.RTF.prototype._controlWordsParsers.clbrdrb = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult;

    parseParams.styles.cells.dimensionCSSRules.borderBottomWidth =
        parseParams.styles.defaults.dimensionCSSRules.borderWidth;
    parseParams.styles.cells.css.borderBottomStyle = parseParams.styles.defaults.css.borderStyle;
    parseParams.styles.cells.css.borderBottomColor = parseParams.styles.defaults.css.borderColor;

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};