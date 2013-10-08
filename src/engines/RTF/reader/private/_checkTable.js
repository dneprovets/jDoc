/**
 *
 * @param params
 * @returns {*}
 * @private
 */
jDoc.Engines.RTF.prototype._checkTable = function (params) {
    params = params || {};

    var table = params.table,
        data = params.params || {};

    if (!table) {
        table = {
            options: jDoc.deepMerge(data.options, {
                isTable: true,
                elementHeight: {
                    value: 0,
                    units: "pt"
                },
                cellsWidth: []
            }),
            header: {
                rows: []
            },
            body: {
                rows: []
            },
            footer: {
                rows: []
            },
            attributes: jDoc.clone(data.attributes),
            dimensionCSSRules: jDoc.clone(data.dimensionCSSRules),
            css: jDoc.clone(data.css)
        };
        delete table.options.isParagraph;

        if (params.row) {
            table.body.rows.push(params.row);
        }

        if (params.parentElementsList) {
            params.parentElementsList[params.parentElementsIndex || 0] = table;
        }

        if (params.tableContainer) {
            params.tableContainer.table = table;
        }
    }

    return table;
};