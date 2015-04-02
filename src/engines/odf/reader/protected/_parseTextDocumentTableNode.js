/**
 *
 * @param params
 * @return {Object}
 * @private
 */
ODF.prototype._parseTextDocumentTableNode = function (params) {
    var header = {
            options: {
                isHeader: true
            },
            children: []
        },
        body = {
            children: []
        },
        footer = {
            options: {
                isFooter: true
            },
            children: []
        },
        result = {
            options: {
                isTable: true,
                pageBreak: false
            },
            children: [header, body, footer],
            attributes: {},
            dimensionCssRules: {},
            css: {}
        },
        i,
        nodes = $.children(params.node),
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
            children: ['table']
        });

        copy(result, styleRules.table);
    }

    for (i = 0; i < llength; i++) {
        localName = nodes[i].localName;
        if (localName === "table-row") {
            body.children.push(copy(this._parseTextDocumentTableRowNode({
                node: nodes[i],
                documentData: params.documentData,
                styles: params.styles
            })));
        } else if (localName === "table-header-rows") {
            cccNodes = $.children(nodes[i]);
            llllength = cccNodes.length;

            for (cc = 0; cc < llllength; cc++) {
                if (cccNodes[cc].localName === "table-row") {
                    header.children.push(this._parseTextDocumentTableRowNode({
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