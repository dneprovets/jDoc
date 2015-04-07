controlWordsParsers.trbrdrt = {
    value (options = {}) {
        var {parseParams, parseResult} = options;

        parseParams.styles.table.dimensionCssRules.borderTopWidth =
            parseParams.styles.defaults.dimensionCssRules.borderWidth;
        parseParams.styles.table.css.borderTopStyle = parseParams.styles.defaults.css.borderStyle;
        parseParams.styles.table.css.borderTopColor = parseParams.styles.defaults.css.borderColor;

        return {
            parseParams,
            parseResult
        };
    }
};