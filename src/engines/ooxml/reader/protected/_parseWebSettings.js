/**
 * @description Parsing document web settings
 * @param xml
 * @return {Object}
 * @private
 */
OOXML.prototype._parseWebSettings = function (xml) {
    var i,
        children = $.children(xml),
        result = {
            optimizeForBrowser: false,
            allowPNG: false
        };

    for (i = children.length - 1; i >= 0; i--) {
        if (children[i].localName === "optimizeForBrowser") {
            result.optimizeForBrowser = !!(
                children[i].attributes['w:val'] &&
                    this.attributeToBoolean(children[i].attributes['w:val'].value)
            );
        } else if (children[i].localName === "allowPNG") {
            result.allowPNG = !!(
                children[i].attributes['w:val'] && this.attributeToBoolean(children[i].attributes['w:val'].value)
            );
        }
    }
    return result;
};