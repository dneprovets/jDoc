/**
 * @description Parsing document web settings
 * @param xml
 * @return {Object}
 * @private
 */
OOXML.prototype._parseWebSettings = function (xml) {
    var children = $.children(xml),
        i = children.length,
        result = {
            optimizeForBrowser: false,
            allowPNG: false
        };

    while (i--) {
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