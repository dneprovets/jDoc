/**
 *
 * @param element
 * @returns {*}
 * @private
 */
jDoc.Engine.prototype.getMaxFontSize = {
    value: function (element) {
        var i,
            len = element.children ? element.children.length : 0,
            fontSize = (
                element.dimensionCssRules.fontSize && element.dimensionCssRules.fontSize.value
                ) || 0;

        for (i = len - 1; i >= 0; i--) {
            if (element.children[i].dimensionCssRules.fontSize && element.children[i].dimensionCssRules.fontSize.value > fontSize) {
                fontSize = element.children[i].dimensionCssRules.fontSize.value;
            }
        }

        return fontSize;
    }
};