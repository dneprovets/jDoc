jDoc.Engines.RTF.prototype.controlWordsParsers.trbrdrb = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult;

    parseParams.styles.table.dimensionCSSRules.borderBottomWidth =
        parseParams.styles.defaults.dimensionCSSRules.borderWidth;
    parseParams.styles.table.css.borderBottomStyle = parseParams.styles.defaults.css.borderStyle;
    parseParams.styles.table.css.borderBottomColor = parseParams.styles.defaults.css.borderColor;

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};