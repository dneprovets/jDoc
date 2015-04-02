/**
 *
 * @param element
 * @param options
 * @returns {number}
 * @private
 */
RTF.prototype._getElementHeight = function (element, options) {
    options = options || {};

    var height = (element.dimensionCssRules.height && element.dimensionCssRules.height.value) || 0,
        i,
        textContent,
        fontSize,
        elementsHeight = 0,
        lineHeight = (element.dimensionCssRules.lineHeight && element.dimensionCssRules.lineHeight.value) || 0,
        width = options.width || 0,
        len;

    if (lineHeight > height) {
        height = lineHeight;
    }

    height += (element.dimensionCssRules.marginTop && element.dimensionCssRules.marginTop.value) || 0;
    height += (element.dimensionCssRules.marginBottom && element.dimensionCssRules.marginBottom.value) || 0;
    height += (element.dimensionCssRules.paddingTop && element.dimensionCssRules.paddingTop.value) || 0;
    height += (element.dimensionCssRules.paddingBottom && element.dimensionCssRules.paddingBottom.value) || 0;

    if (width) {
        width -= (element.dimensionCssRules.paddingLeft && element.dimensionCssRules.paddingLeft.value) || 0;
        width -= (element.dimensionCssRules.paddingRight && element.dimensionCssRules.paddingRight.value) || 0;
        width -= (element.dimensionCssRules.marginLeft && element.dimensionCssRules.marginLeft.value) || 0;
        width -= (element.dimensionCssRules.marginRight && element.dimensionCssRules.marginRight.value) || 0;
    }

    if (element.options.isParagraph) {
        len = (element.children && element.children.length) || 0;
        textContent = "";
        fontSize = 0;
        elementsHeight = 0;

        for (i = 0; i < len; i++) {
            textContent += element.children[i].properties.textContent;

            if (!fontSize && element.children[i].properties.textContent[0]) {
                fontSize = (
                    element.children[i].dimensionCssRules.fontSize && element.children[i].dimensionCssRules.fontSize.value
                ) || 0;
            }

            if (element.children[i].dimensionCssRules.lineHeight && element.children[i].dimensionCssRules.lineHeight.value) {
                lineHeight = element.children[i].dimensionCssRules.lineHeight.value;
            }
        }

        if (textContent[0]) {
            elementsHeight = this.spotElementHeight({
                el: {
                    textContent: textContent
                },
                lineHeight: lineHeight / fontSize,
                width: width,
                parentFontSize: (element.dimensionCssRules.fontSize && element.dimensionCssRules.fontSize.value),
                fontSize: fontSize
            });
        }

        if (elementsHeight > height) {
            height = elementsHeight;
        }
    }

    return height;
};