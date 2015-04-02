RTF.prototype._controlWordsParsers.trowd = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        table = parseParams.table,
        body = this._getTableBody(table),
        row = table ? body.children[body.children.length - 1] : null;

    if (row) {
        row.css = {};
        row.dimensionCssRules = {};
    }

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};