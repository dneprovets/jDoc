controlWordsParsers.clbrdrt = {
    value (options = {}) {
        var {parseParams, parseResult} = options;

        parseParams.styles.cells.dimensionCssRules.borderTopWidth =
            parseParams.styles.defaults.dimensionCssRules.borderWidth;
        parseParams.styles.cells.css.borderTopStyle = parseParams.styles.defaults.css.borderStyle;
        parseParams.styles.cells.css.borderTopColor = parseParams.styles.defaults.css.borderColor;

        return {
            parseParams,
            parseResult
        };
    }
};