controlWordsParsers.clbrdrb = {
    value (options = {}) {
        var {parseParams, parseResult} = options;

        parseParams.styles.cells.dimensionCssRules.borderBottomWidth =
            parseParams.styles.defaults.dimensionCssRules.borderWidth;
        parseParams.styles.cells.css.borderBottomStyle = parseParams.styles.defaults.css.borderStyle;
        parseParams.styles.cells.css.borderBottomColor = parseParams.styles.defaults.css.borderColor;

        return {
            parseParams,
            parseResult
        };
    }
};