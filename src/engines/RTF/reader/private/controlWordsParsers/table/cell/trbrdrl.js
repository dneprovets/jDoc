jDoc.Engines.RTF.prototype.controlWordsParsers.trbrdrl = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult;

    parseParams.styles.table.dimensionCSSRules.borderLeftWidth =
        parseParams.styles.defaults.dimensionCSSRules.borderWidth;
    parseParams.styles.table.css.borderLeftStyle = parseParams.styles.defaults.css.borderStyle;
    parseParams.styles.table.css.borderLeftColor = parseParams.styles.defaults.css.borderColor;

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};