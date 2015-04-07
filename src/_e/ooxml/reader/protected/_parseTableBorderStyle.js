/**
 *
 * @param options
 * @private
 */
OOXML.prototype._parseTableBorderStyle = function (options) {
    var result = {
            css: {},
            dimensionCssRules: {}
        },
        borderInfo,
        rulePart,
        children = $.children(options.node),
        i = children.length;

    while (i--) {
        if (["top", "left", "right", "bottom"].indexOf(children[i].localName) >= 0) {
            rulePart = children[i].localName.charAt(0).toUpperCase() + children[i].localName.slice(1);
            borderInfo = this._parseTableBorderProperties(children[i]);
            result.dimensionCssRules['border' + rulePart + 'Width'] = borderInfo.width;
            result.css['border' + rulePart + 'Style'] = borderInfo.style;
            result.css['border' + rulePart + 'TopColor'] = borderInfo.color;
        }
    }

    return result;
};