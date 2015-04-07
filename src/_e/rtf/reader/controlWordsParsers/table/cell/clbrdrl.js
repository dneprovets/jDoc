controlWordsParsers.clbrdrl = {
    value (options = {}) {
        var {parseParams, parseResult} = options;

        parseParams.styles.cells.dimensionCssRules.borderLeftWidth =
            parseParams.styles.defaults.dimensionCssRules.borderWidth;
        parseParams.styles.cells.css.borderLeftStyle = parseParams.styles.defaults.css.borderStyle;
        parseParams.styles.cells.css.borderLeftColor = parseParams.styles.defaults.css.borderColor;

        return {
            parseParams,
            parseResult
        };
    }
};