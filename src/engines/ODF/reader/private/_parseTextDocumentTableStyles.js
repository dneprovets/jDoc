/** @lends jDoc.engines.ODF.prototype
 *
 * @param node
 * @return {Object}
 * @private
 */
jDoc.engines.ODF.prototype._parseTextDocumentTableStyles = function (node) {
    var nodes = jDoc.DOM.children(node),
        length = nodes.length,
        j,
        result = {
            css: {},
            dimensionCSSRules: {},
            options: {}
        },
        size = {};

    for (j = length - 1; j >= 0; j--) {
        if (nodes[j].localName === "table-properties") {
            if (nodes[j].attributes['style:width'] && nodes[j].attributes['style:width'].value) {
                size = this._getSize(nodes[j].attributes['style:width'].value);
                if (size.units) {
                    result.dimensionCSSRules.width = size;
                }
            }
            if (nodes[j].attributes['table:border-model'] && nodes[j].attributes['table:border-model'].value) {
                result.css.borderCollapse =
                    (/coll/ig).test(nodes[j].attributes['table:border-model'].value) ? "collapse" : "separate";
            }
        }
    }

    return result;
};