/**
 *
 * @param params
 * @return {Object}
 * @private
 */
ODF.prototype._parseTextDocumentListNode = function (params) {
    var result = {
            options: {
                isList: true,
                pageBreak: false
            },
            attributes: {},
            css: {},
            dimensionCssRules: {},
            children: []
        },
        styleRules,
        i,
        j,
        nodes = $.children(params.node),
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
            children: ['list']
        });

        copy(result, styleRules.list);
    }

    for (i = 0; i < len; i++) {
        item = {
            options: {},
            attributes: {},
            css: {},
            dimensionCssRules: {},
            children: []
        };

        if (nodes[i].localName === "list-item") {
            childNodes = $.children(nodes[i]);
            length = childNodes.length;

            for (j = 0; j < length; j++) {
                if (childNodes[j].localName === "p") {
                    item.children.push(this._parseTextDocumentParagraphNode({
                        node: childNodes[j],
                        styles: params.styles,
                        documentData: params.documentData
                    }));
                }
            }
        }
        result.children[i] = item;
    }

    return result;
};