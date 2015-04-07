controlWordsParsers.clvertalt = {
    value (options = {}) {
        var {parseParams, parseResult} = options;

        parseParams.styles.cells.css.verticalAlign = "top";

        return {
            parseParams,
            parseResult
        };
    }
};