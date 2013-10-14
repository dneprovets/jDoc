/**
 *
 * @param params
 * @return {Object}
 * @private
 */
jDoc.engines.ODF.prototype._parseTextDocumentTableNode = function (params) {
    var result = {
            options: {
                isTable: true,
                pageBreak: false
            },
            header: {
                rows: []
            },
            body: {
                rows: []
            },
            footer: {
                rows: []
            },
            attributes: {},
            dimensionCSSRules: {},
            css: {}
        },
        i,
        nodes = jDoc.DOM.children(params.node),
        llength = nodes.length,
        cccNodes = [],
        cc = 0,
        llllength = 0,
        row = {},
        localName,
        styleRules = {};

    if (params.node.attributes['table:name'] && params.node.attributes['table:name'].value) {
        result.attributes.name = params.node.attributes['table:name'].value;
    }
    if (params.node.attributes['table:style-name'] && params.node.attributes['table:style-name'].value) {
        styleRules  = this._getStyleRules({
            documentData: params.documentData,
            styles: params.styles,
            styleName: params.node.attributes['table:style-name'].value,
            elements: ['table']
        });

        jDoc.deepMerge(result, styleRules.table);
    }

    for (i = 0; i < llength; i++) {
        localName = nodes[i].localName;
        if (localName === "table-row") {
            result.body.rows.push(jDoc.deepMerge(this._parseTextDocumentTableRowNode({
                node: nodes[i],
                documentData: params.documentData,
                styles: params.styles
            })));
        } else if (localName === "table-header-rows") {
            cccNodes = jDoc.DOM.children(nodes[i]);
            llllength = cccNodes.length;

            for (cc = 0; cc < llllength; cc++) {
                if (cccNodes[cc].localName === "table-row") {
                    result.header.rows.push(this._parseTextDocumentTableRowNode({
                        node: cccNodes[cc],
                        documentData: params.documentData,
                        styles: params.styles
                    }));
                }
            }
        }
    }

    return result;
};