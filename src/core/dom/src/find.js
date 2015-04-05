/**
 *
 * @param element
 * @param tagName
 * @returns {*}
 */
export default {
    value (element, tagName) {
        var i;

        if (!element || !element.childNodes || !tagName) {
            return null;
        }

        i = element.childNodes.length;

        while (i--) {
            if (element.childNodes[i].localName === tagName || element.childNodes[i].nodeName === tagName) {
                return element.childNodes[i];
            }
        }

        return null;
    }
};