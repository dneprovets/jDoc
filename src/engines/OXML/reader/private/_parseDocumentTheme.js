/**
 *
 * @param xml
 * @returns {*}
 * @private
 */
jDoc.engines.OXML.prototype._parseDocumentTheme = function (xml) {
    var themeElementsNode = xml.querySelector('themeElements'),
        themeElements,
        i,
        font,
        fontNode,
        result = {
            css: {}
        };

    if (themeElementsNode) {
        themeElements = jDoc.DOM.children(themeElementsNode);

        for (i = themeElements.length - 1; i >= 0; i--) {
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