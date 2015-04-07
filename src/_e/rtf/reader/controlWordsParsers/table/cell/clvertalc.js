controlWordsParsers.clvertalc = {
    value (options = {}) {
        var {parseParams, parseResult} = options;

        parseParams.styles.cells.css.verticalAlign = "middle";

        return {
            parseParams,
            parseResult
        };
    }
};