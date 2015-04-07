controlWordsParsers.clbrdrr = {
    value (options = {}) {
        var {parseParams, parseResult} = options;

        parseParams.styles.cells.dimensionCssRules.borderRightWidth =
            parseParams.styles.defaults.dimensionCssRules.borderWidth;
        parseParams.styles.cells.css.borderRightStyle = parseParams.styles.defaults.css.borderStyle;
        parseParams.styles.cells.css.borderRightColor = parseParams.styles.defaults.css.borderColor;

        return {
            parseParams,
            parseResult
        };
    }
};