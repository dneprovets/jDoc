/**
 * Parsing document web settings
 * @param xml
 * @return {Object}
 * @private
 */
jDoc.engines.OXML.prototype._parseWebSettings = function (xml) {
    var i,
        children = jDoc.DOM.children(xml),
        result = {
            optimizeForBrowser: false,
            allowPNG: false
        };

    for (i = children.length - 1; i >= 0; i--) {
        if (children[i].localName === "optimizeForBrowser") {
            result.optimizeForBrowser = !!(
                children[i].attributes['w:val'] &&
                    this._attributeToBoolean(children[i].attributes['w:val'].value)
            );
        } else if (children[i].localName === "allowPNG") {
            result.allowPNG = !!(
                children[i].attributes['w:val'] && this._attributeToBoolean(children[i].attributes['w:val'].value)
            );
        }
    }
    return result;
};