/**
 *
 * @param params
 * @returns {*}
 * @private
 */
ODF.prototype._parseTextDocumentTableRowNode = function (params) {
    var row = {
            children: [],
            css: {},
            dimensionCSSRules: {}
        },
        j,
        c,
        cell,
        ccNodes,
        lllength,
        styleRules = {},
        cNodes = $.children(params.node),
        length = cNodes.length;

    for (j = 0; j < length; j++) {
        if (cNodes[j].localName === "table-cell") {
            if (cNodes[j].attributes['table:style-name'] && cNodes[j].attributes['table:style-name'].value) {
                styleRules  = this._getStyleRules({
                    documentData: params.documentData,
                    styles: params.styles,
                    styleName: cNodes[j].attributes['table:style-name'].value,
                    children: ['tableCell']
                });
            }

            cell = copy({
                children: [],
                options: {}
            }, params.styles, styleRules.tableCell);
            ccNodes = $.children(cNodes[j]);
            lllength = ccNodes.length;

            for (c = 0; c < lllength; c++) {
                if (ccNodes[c].localName === "p") {
                    cell.children.push(this._parseTextDocumentParagraphNode({
                        node: ccNodes[c],
                        styles: params.styles,
                        documentData: params.documentData
                    }));
                }
            }
            row.children.push(cell);
        }
    }

    return row;
};