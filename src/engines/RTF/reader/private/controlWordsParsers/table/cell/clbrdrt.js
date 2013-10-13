jDoc.Engines.RTF.prototype.controlWordsParsers.clbrdrt = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult;

    parseParams.styles.cells.dimensionCSSRules.borderTopWidth =
        parseParams.styles.defaults.dimensionCSSRules.borderWidth;
    parseParams.styles.cells.css.borderTopStyle = parseParams.styles.defaults.css.borderStyle;
    parseParams.styles.cells.css.borderTopColor = parseParams.styles.defaults.css.borderColor;

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};