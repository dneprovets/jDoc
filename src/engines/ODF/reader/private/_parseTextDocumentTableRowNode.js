/**
 *
 * @param params
 * @returns {*}
 * @private
 */
jDoc.engines.ODF.prototype._parseTextDocumentTableRowNode = function (params) {
    var row = {
            cells: [],
            css: {},
            dimensionCSSRules: {}
        },
        j,
        c,
        cell,
        ccNodes,
        lllength,
        styleRules = {},
        cNodes = jDoc.DOM.children(params.node),
        length = cNodes.length;

    for (j = 0; j < length; j++) {
        if (cNodes[j].localName === "table-cell") {
            if (cNodes[j].attributes['table:style-name'] && cNodes[j].attributes['table:style-name'].value) {
                styleRules  = this._getStyleRules({
                    documentData: params.documentData,
                    styles: params.styles,
                    styleName: cNodes[j].attributes['table:style-name'].value,
                    elements: ['tableCell']
                });
            }

            cell = jDoc.deepMerge({
                elements: [],
                options: {}
            }, params.styles, styleRules.tableCell);
            ccNodes = jDoc.DOM.children(cNodes[j]);
            lllength = ccNodes.length;

            for (c = 0; c < lllength; c++) {
                if (ccNodes[c].localName === "p") {
                    cell.elements.push(this._parseTextDocumentParagraphNode({
                        node: ccNodes[c],
                        styles: params.styles,
                        documentData: params.documentData
                    }));
                }
            }
            row.cells.push(cell);
        }
    }

    return row;
};