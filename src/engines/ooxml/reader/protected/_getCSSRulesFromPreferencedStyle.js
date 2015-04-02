/**
 *
 * @param style
 * @returns {*}
 * @private
 */
OOXML.prototype._getCssRulesFromPreferencedStyle = function (style) {
    return {
        elementCssRules: {
            css: style.lineStyle.css || {},
            dimensionCssRules: style.lineStyle.dimensionCssRules || {}
        },
        childrenCssRules: {
            css: style.contentProperties.css || {},
            dimensionCssRules: style.contentProperties.dimensionCssRules || {}
        }
    };
};