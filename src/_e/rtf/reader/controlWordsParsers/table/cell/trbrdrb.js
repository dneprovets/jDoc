controlWordsParsers.trbrdrb = {
    value (options = {}) {
        var {parseParams, parseResult} = options;

        parseParams.styles.table.dimensionCssRules.borderBottomWidth =
            parseParams.styles.defaults.dimensionCssRules.borderWidth;
        parseParams.styles.table.css.borderBottomStyle = parseParams.styles.defaults.css.borderStyle;
        parseParams.styles.table.css.borderBottomColor = parseParams.styles.defaults.css.borderColor;

        return {
            parseParams,
            parseResult
        };
    }
};