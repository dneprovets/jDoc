/**
 * @param node
 * @return {String}
 * @private
 */
jDoc.engines.OXML.prototype._parseStyleEffectProperty = function (node) {
    return (node && node.attributes['w:val']) ? this._effectPatterns[node.attributes['w:val']] || "none" : "none";
};