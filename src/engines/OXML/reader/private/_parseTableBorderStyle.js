/**
 *
 * @param options
 * @private
 */
jDoc.engines.OXML.prototype._parseTableBorderStyle = function (options) {
    var result = {
        css: {},
        dimensionCSSRules: {}
    },
        i,
        borderInfo,
        rulePart,
        children = jDoc.DOM.children(options.node);

    for (i = children.length - 1; i >= 0; i--) {
        if (["top", "left", "right", "bottom"].indexOf(children[i].localName) >= 0) {
            rulePart = children[i].localName.charAt(0).toUpperCase() + children[i].localName.slice(1);
            borderInfo = this._parseTableBorderProperties(children[i]);
            result.dimensionCSSRules['border' + rulePart + 'Width'] = borderInfo.width;
            result.css['border' + rulePart + 'Style'] = borderInfo.style;
            result.css['border' + rulePart + 'TopColor'] = borderInfo.color;
        }
    }

    return result;
};