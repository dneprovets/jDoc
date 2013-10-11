/**
 *
 * @param params
 * @returns {*}
 * @private
 */
jDoc.Engines.RTF.prototype._initTable = function (params) {
    params = params || {};

    var data = params.params || {},
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

    table.css = jDoc.deepMerge(
        {},
        table.css,
        params.parseParams.styles.table.css
    );

    table.dimensionCSSRules = jDoc.deepMerge(
        {},
        table.dimensionCSSRules,
        params.parseParams.styles.table.dimensionCSSRules
    );

    if (params.parseParams) {
        params.parseParams.table = table;
    }

    return table;
};