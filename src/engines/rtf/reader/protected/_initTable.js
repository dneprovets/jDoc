/**
 *
 * @param params
 * @returns {*}
 * @private
 */
RTF.prototype._initTable = function (params) {
    params = params || {};

    var data = params.params || {},
        body = {
            children: []
        },
        table = {
            options: copy(data.options, {
                isTable: true,
                elementHeight: {
                    value: 0,
                    unit: "pt"
                },
                cellsWidth: []
            }),
            children: [
                {
                    options: {
                        isHeader: true
                    },
                    children: []
                },
                {
                    options: {
                        isFooter: true
                    },
                    children: []
                },
                body
            ],
            attributes: clone(data.attributes),
            dimensionCSSRules: clone(data.dimensionCSSRules),
            css: copy({}, data.css, {
                borderCollapse: "collapse"
            })
        };

    delete table.options.isParagraph;

    if (params.row) {
        body.children.push(params.row);
    }

    if (params.parentElementsList) {
        params.parentElementsList[params.parentElementsIndex || 0] = table;
    }

    table.css = copy(
        {},
        table.css,
        params.parseParams.styles.table.css
    );

    table.dimensionCSSRules = copy(
        {},
        table.dimensionCSSRules,
        params.parseParams.styles.table.dimensionCSSRules
    );

    if (params.parseParams) {
        params.parseParams.table = table;
    }

    return table;
};