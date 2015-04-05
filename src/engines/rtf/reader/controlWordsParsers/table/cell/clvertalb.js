controlWordsParsers.clvertalb = {
    value (options = {}) {
        var {parseParams, parseResult} = options;

        parseParams.styles.cells.css.verticalAlign = "bottom";

        return {
            parseParams,
            parseResult
        };
    }
};