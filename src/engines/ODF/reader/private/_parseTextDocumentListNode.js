/**
 *
 * @param params
 * @return {Object}
 * @private
 */
jDoc.Engines.ODF.prototype._parseTextDocumentListNode = function (params) {
    var result = {
            options: {
                isList: true,
                pageBreak: false
            },
            attributes: {},
            css: {},
            dimensionCSSRules: {},
            items: []
        },
        styleRules,
        i,
        j,
        nodes = jDoc.DOM.children(params.node),
        childNodes = [],
        length,
        len = nodes.length,
        item;

    if (params.node.attributes['xml:id'] && params.node.attributes['xml:id'].value) {
        result.attributes.id = params.node.attributes['xml:id'].value;
    }
    if (params.node.attributes['text:style-name'] && params.node.attributes['text:style-name'].value) {
        styleRules  = this._getStyleRules({
            documentData: params.documentData,
            styles: params.styles,
            styleName: params.node.attributes['text:style-name'].value,
            elements: ['list']
        });

        jDoc.deepMerge(result, styleRules.list);
    }

    for (i = 0; i < len; i++) {
        item = {
            options: {},
            attributes: {},
            css: {},
            dimensionCSSRules: {},
            elements: []
        };

        if (nodes[i].localName === "list-item") {
            childNodes = jDoc.DOM.children(nodes[i]);
            length = childNodes.length;

            for (j = 0; j < length; j++) {
                if (childNodes[j].localName === "p") {
                    item.elements.push(this._parseTextDocumentParagraphNode({
                        node: childNodes[j],
                        styles: params.styles,
                        documentData: params.documentData
                    }));
                }
            }
        }
        result.items[i] = item;
    }

    return result;
};