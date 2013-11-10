jDoc.engines.RTF.prototype._controlWordsParsers.trowd = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        table = parseParams.table,
        row = table ? table.body.rows[table.body.rows.length - 1] : null;

    if (row) {
        row.css = {};
        row.dimensionCSSRules = {};
    }

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};