/**
 *
 * @param node
 * @return {Object}
 * @private
 */
ODF.prototype._parseTextDocumentTableColumnStyles = function (node) {
    var nodes = $.children(node),
        length = nodes.length,
        j,
        result = {
            css: {},
            dimensionCssRules: {},
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
                if (size.unit) {
                    result.dimensionCssRules.width = size;
                }
            }
        }
    }

    return result;
};