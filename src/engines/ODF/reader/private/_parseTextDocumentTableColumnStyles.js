/**
 *
 * @param node
 * @return {Object}
 * @private
 */
jDoc.engines.ODF.prototype._parseTextDocumentTableColumnStyles = function (node) {
    var nodes = jDoc.DOM.children(node),
        length = nodes.length,
        j,
        result = {
            css: {},
            dimensionCSSRules: {},
            options: {}
        },
        size = {};

    for (j = 0; j < length; j++) {
        if (nodes[j].localName === "table-column-properties") {
            if (
                nodes[j].attributes['style:column-width'] &&
                    nodes[j].attributes['style:column-width'].value
            ) {
                size = this._getSize(nodes[j].attributes['style:column-width'].value);
                if (size.units) {
                    result.dimensionCSSRules.width = size;
                }
            }
        }
    }

    return result;
};