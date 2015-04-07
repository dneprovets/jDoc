/**
 *
 * @param params
 * @returns {*}
 * @private
 */
RTF.prototype._initTable = {
    value (params = {}) {
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
                dimensionCssRules: clone(data.dimensionCssRules),
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

        table.dimensionCssRules = copy(
            {},
            table.dimensionCssRules,
            params.parseParams.styles.table.dimensionCssRules
        );

        if (params.parseParams) {
            params.parseParams.table = table;
        }

        return table;
    }
};