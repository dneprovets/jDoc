jDoc.Engines.RTF.prototype.controlWordsParsers.clbrdrl = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult;

    parseParams.styles.cells.dimensionCSSRules.borderLeftWidth =
        parseParams.styles.defaults.dimensionCSSRules.borderWidth;
    parseParams.styles.cells.css.borderLeftStyle = parseParams.styles.defaults.css.borderStyle;
    parseParams.styles.cells.css.borderLeftColor = parseParams.styles.defaults.css.borderColor;

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};