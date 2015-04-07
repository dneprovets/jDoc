controlWordsParsers.trowd = {
    value (options = {}) {
        var {parseParams, parseResult} = options,
            table = parseParams.table,
            body = this._getTableBody(table),
            row = table ? body.children[body.children.length - 1] : null;

        if (row) {
            row.css = {};
            row.dimensionCssRules = {};
        }

        return {
            parseParams,
            parseResult
        };
    }
};