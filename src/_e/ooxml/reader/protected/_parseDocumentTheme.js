/**
 *
 * @param xml
 * @returns {*}
 * @private
 */
OOXML.prototype._parseDocumentTheme = function (xml) {
    var themeElementsNode = xml.querySelector('themeElements'),
        themeElements,
        i,
        font,
        fontNode,
        result = {
            css: {}
        };

    if (themeElementsNode) {
        themeElements = $.children(themeElementsNode);
        i = themeElements.length;

        while (i--) {
            if (themeElements[i].localName == "fontScheme") {
                fontNode = themeElements[i].querySelector('minorFont');
                font = fontNode.querySelector('latin');

                if (font && font.attributes.typeface && font.attributes.typeface.value) {
                    result.css.fontFamily = font.attributes.typeface.value;
                }

                fontNode = themeElements[i].querySelector('majorFont');
                font = fontNode.querySelector('latin');

                if (font && font.attributes.typeface && font.attributes.typeface.value) {
                    result.css.fontFamily = font.attributes.typeface.value;
                }

                break;
            }
        }
    }

    return result;
};