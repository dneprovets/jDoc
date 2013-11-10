/**
 * Parse boxShadow style from property node
 * @param node
 * @return {String}
 * @private
 */
jDoc.engines.OXML.prototype._parseShadowProperty = function (node) {
    var result = "none";

    if (
        node &&
            node.attributes['w:val'] &&
            node.attributes['w:color'] &&
            this._shadowPatterns[node.attributes['w:val'].value]
    ) {
        result = this._shadowPatterns[node.attributes['w:val'].value] + " " + node.attributes['w:color'];
    }

    return result;
};