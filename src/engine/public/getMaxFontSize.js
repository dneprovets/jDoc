/**
 *
 * @param element
 * @returns {*}
 * @private
 */
jDoc.Engine.prototype.getMaxFontSize = function (element) {
    var i,
        len = element.children ? element.children.length : 0,
        fontSize = (
            element.dimensionCSSRules.fontSize && element.dimensionCSSRules.fontSize.value
        ) || 0;

    for (i = len - 1; i >= 0; i--) {
        if (element.children[i].dimensionCSSRules.fontSize && element.children[i].dimensionCSSRules.fontSize.value > fontSize) {
            fontSize = element.children[i].dimensionCSSRules.fontSize.value;
        }
    }

    return fontSize;
};