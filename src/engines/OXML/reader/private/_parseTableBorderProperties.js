/**
 * @param node
 * @return {Object}
 * @private
 */
jDoc.Engines.OXML.prototype._parseTableBorderProperties = function (node) {
    var borderColor = (
            node.attributes['w:color'] && node.attributes['w:color'].value
        ) ? node.attributes['w:color'].value : "";

    return {
        width: (
            node.attributes['w:sz'] && !isNaN(node.attributes['w:sz'].value)
            ) ? {
            value: node.attributes['w:sz'].value / 8,
            units: "pt"
        } : 0,
        style: "solid",
        color: this._normalizeColorValue(borderColor)
    };
};