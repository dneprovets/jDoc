jDoc.Engines.RTF.prototype.controlWordsParsers.clbrdrr = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult;

    parseParams.styles.cells.dimensionCSSRules.borderRightWidth =
        parseParams.styles.defaults.dimensionCSSRules.borderWidth;
    parseParams.styles.cells.css.borderRightStyle = parseParams.styles.defaults.css.borderStyle;
    parseParams.styles.cells.css.borderRightColor = parseParams.styles.defaults.css.borderColor;

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};