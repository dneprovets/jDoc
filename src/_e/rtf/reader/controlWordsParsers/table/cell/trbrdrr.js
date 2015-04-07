controlWordsParsers.trbrdrr = {
    value (options = {}) {
        var {parseParams, parseResult} = options;

        parseParams.styles.table.dimensionCssRules.borderRightWidth =
            parseParams.styles.defaults.dimensionCssRules.borderWidth;
        parseParams.styles.table.css.borderRightStyle = parseParams.styles.defaults.css.borderStyle;
        parseParams.styles.table.css.borderRightColor = parseParams.styles.defaults.css.borderColor;

        return {
            parseParams,
            parseResult
        };
    }
};