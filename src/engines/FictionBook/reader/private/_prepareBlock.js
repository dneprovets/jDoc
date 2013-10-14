/**
 * @param xml
 * @param documentData
 * @private
 */
jDoc.engines.FictionBook.prototype._prepareBlock = function (xml, documentData) {
    var i,
        nodes = jDoc.DOM.children(xml),
        len = nodes.length,
        result = {
            options: {},
            css: {},
            dimensionCSSRules: {},
            elements: []
        };

    for (i = 0; i < len; i++) {
        if (nodes[i].localName) {
            result.elements.push(this._parseBlockElement({
                node: nodes[i],
                documentData: documentData
            }));
        }
    }

    return result;
};