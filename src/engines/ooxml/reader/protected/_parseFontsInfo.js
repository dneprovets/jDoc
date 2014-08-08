/**
 *
 * @description Parsing information about fonts
 * @param xml
 * @return {Object}
 * @private
 */
OOXML.prototype._parseFontsInfo = function (xml) {
    var fontInfoNodes = xml.childNodes[0] ? $.children(xml.childNodes[0]) : [],
        result = {},
        self = this,
        attributesCount,
        k,
        i,
        j,
        len,
        nameAttribute,
        children;

    for (i = fontInfoNodes.length - 1; i >= 0; i--) {
        nameAttribute = fontInfoNodes[i].attributes['w:name'];

        if (nameAttribute && nameAttribute.value) {
            result[nameAttribute.value] = {};
            children = $.children(fontInfoNodes[i]);
            len = children.length;

            for (j = len - 1; j >= 0; j--) {
                switch (children[j].localName) {
                case "panose1":
                    if (children[j].attributes['w:val'] && children[j].attributes['w:val'].value) {
                        result[nameAttribute.value].panose1 = children[j].attributes['w:val'].value;
                    }
                    break;
                case "charset":
                    if (children[j].attributes['w:val'] && children[j].attributes['w:val'].value) {
                        result[nameAttribute.value].charset = children[j].attributes['w:val'].value;
                    }
                    break;
                case "family":
                    if (children[j].attributes['w:val'] && children[j].attributes['w:val'].value) {
                        result[nameAttribute.value].family = children[j].attributes['w:val'].value;
                    }
                    break;
                case "pitch":
                    if (children[j].attributes['w:val'] && children[j].attributes['w:val'].value) {
                        result[nameAttribute.value].pitch = children[j].attributes['w:val'].value;
                    }
                    break;
                case "sig":
                    result[nameAttribute.value].signature = {};
                    attributesCount = children[j].attributes.length;

                    for (k = 0; k < attributesCount; k++) {
                        if (children[j].attributes[k] && children[j].attributes[k].value) {
                            result[nameAttribute.value].signature[
                                self.replaceAttributeNamespace(children[j].attributes[k].name)
                                ] = children[j].attributes[k].value;
                        }
                    }
                    break;
                }
            }
        }
    }
    return result;
};