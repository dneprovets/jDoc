/**
 *
 * @param element
 * @returns {*}
 * @private
 */
jDoc.Engine.prototype._getMaxFontSize = function (element) {
    var i,
        len = element.elements ? element.elements.length : 0,
        fontSize = (
            element.dimensionCSSRules.fontSize && element.dimensionCSSRules.fontSize.value
        ) || 0;

    for (i = len - 1; i >= 0; i--) {
        if (element.elements[i].dimensionCSSRules.fontSize && element.elements[i].dimensionCSSRules.fontSize.value > fontSize) {
            fontSize = element.elements[i].dimensionCSSRules.fontSize.value;
        }
    }

    return fontSize;
};