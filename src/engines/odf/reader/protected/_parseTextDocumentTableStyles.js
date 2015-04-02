/** @lends ODF.prototype
 *
 * @param node
 * @return {Object}
 * @private
 */
ODF.prototype._parseTextDocumentTableStyles = function (node) {
    var nodes = $.children(node),
        j = nodes.length,
        result = {
            css: {},
            dimensionCssRules: {},
            options: {}
        },
        size = {};

    while (j--) {
        if (nodes[j].localName === "table-properties") {
            if (nodes[j].attributes['style:width'] && nodes[j].attributes['style:width'].value) {
                size = this._getSize(nodes[j].attributes['style:width'].value);
                if (size.unit) {
                    result.dimensionCssRules.width = size;
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