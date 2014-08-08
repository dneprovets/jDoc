/**
 *
 * @param element
 * @param tagName
 * @returns {*}
 */
$.findAll = function (element, tagName) {
    var i,
        childrenCount,
        result = [];

    if (!element || !element.childNodes || !tagName) {
        return result;
    }

    childrenCount = element.childNodes.length;

    if (!childrenCount) {
        return result;
    }

    for (i = 0; i < childrenCount; i++) {
        if (element.childNodes[i].localName == tagName || element.childNodes[i].nodeName == tagName) {
            result.push(element.childNodes[i]);
        }
    }
    return result;
};