/**
 *
 * @param element
 * @param tagName
 * @returns {*}
 */
$.find = function (element, tagName) {
    var i,
        childrenCount;

    if (!element || !element.childNodes || !tagName) {
        return null;
    }

    childrenCount = element.childNodes.length;

    if (!childrenCount) {
        return null;
    }

    for (i = 0; i < childrenCount; i++) {
        if (element.childNodes[i].localName == tagName || element.childNodes[i].nodeName == tagName) {
            return element.childNodes[i];
        }
    }

    return null;
};