/**
 * @param xml
 * @param documentData
 * @private
 */
FictionBook.prototype._prepareBlock = function (xml, documentData) {
    var i,
        nodes = $.children(xml),
        len = nodes.length,
        result = {
            options: {},
            css: {},
            dimensionCssRules: {},
            children: []
        };

    for (i = 0; i < len; i++) {
        if (nodes[i].localName) {
            result.children.push(this._parseBlockElement({
                node: nodes[i],
                documentData: documentData
            }));
        }
    }

    return result;
};