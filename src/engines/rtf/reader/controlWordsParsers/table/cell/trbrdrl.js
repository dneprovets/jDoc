controlWordsParsers.trbrdrl = {
    value (options = {}) {
        var {parseParams, parseResult} = options;

        parseParams.styles.table.dimensionCssRules.borderLeftWidth =
            parseParams.styles.defaults.dimensionCssRules.borderWidth;
        parseParams.styles.table.css.borderLeftStyle = parseParams.styles.defaults.css.borderStyle;
        parseParams.styles.table.css.borderLeftColor = parseParams.styles.defaults.css.borderColor;

        return {
            parseParams,
            parseResult
        };
    }
};