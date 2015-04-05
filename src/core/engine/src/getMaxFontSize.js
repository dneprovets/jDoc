/**
 *
 * @param element
 * @returns {*}
 * @private
 */
export default {
    value (element = {}) {
        var i = element.children ? element.children.length : 0,
            fontSize = (
                element.dimensionCssRules.fontSize && element.dimensionCssRules.fontSize.value
            ) || 0;

        while (i--) {
            if (element.children[i].dimensionCssRules.fontSize && element.children[i].dimensionCssRules.fontSize.value > fontSize) {
                fontSize = element.children[i].dimensionCssRules.fontSize.value;
            }
        }

        return fontSize;
    }
};