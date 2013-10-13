jDoc.Engines.RTF.prototype.controlWordsParsers.trbrdrb = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult;

    parseParams.styles.table.dimensionCSSRules.borderTopWidth =
        parseParams.styles.defaults.dimensionCSSRules.borderWidth;
    parseParams.styles.table.css.borderTopStyle = parseParams.styles.defaults.css.borderStyle;
    parseParams.styles.table.css.borderTopColor = parseParams.styles.defaults.css.borderColor;

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};