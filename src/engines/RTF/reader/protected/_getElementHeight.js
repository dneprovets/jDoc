/**
 *
 * @param element
 * @param options
 * @returns {number}
 * @private
 */
RTF.prototype._getElementHeight = function (element, options) {
    options = options || {};

    var height = (element.dimensionCSSRules.height && element.dimensionCSSRules.height.value) || 0,
        i,
        textContent,
        fontSize,
        elementsHeight = 0,
        lineHeight = (element.dimensionCSSRules.lineHeight && element.dimensionCSSRules.lineHeight.value) || 0,
        width = options.width || 0,
        len;

    if (lineHeight > height) {
        height = lineHeight;
    }

    height += (element.dimensionCSSRules.marginTop && element.dimensionCSSRules.marginTop.value) || 0;
    height += (element.dimensionCSSRules.marginBottom && element.dimensionCSSRules.marginBottom.value) || 0;
    height += (element.dimensionCSSRules.paddingTop && element.dimensionCSSRules.paddingTop.value) || 0;
    height += (element.dimensionCSSRules.paddingBottom && element.dimensionCSSRules.paddingBottom.value) || 0;

    if (width) {
        width -= (element.dimensionCSSRules.paddingLeft && element.dimensionCSSRules.paddingLeft.value) || 0;
        width -= (element.dimensionCSSRules.paddingRight && element.dimensionCSSRules.paddingRight.value) || 0;
        width -= (element.dimensionCSSRules.marginLeft && element.dimensionCSSRules.marginLeft.value) || 0;
        width -= (element.dimensionCSSRules.marginRight && element.dimensionCSSRules.marginRight.value) || 0;
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
                    element.children[i].dimensionCSSRules.fontSize && element.children[i].dimensionCSSRules.fontSize.value
                ) || 0;
            }

            if (element.children[i].dimensionCSSRules.lineHeight && element.children[i].dimensionCSSRules.lineHeight.value) {
                lineHeight = element.children[i].dimensionCSSRules.lineHeight.value;
            }
        }

        if (textContent[0]) {
            elementsHeight = this.spotElementHeight({
                el: {
                    textContent: textContent
                },
                lineHeight: lineHeight / fontSize,
                width: width,
                parentFontSize: (element.dimensionCSSRules.fontSize && element.dimensionCSSRules.fontSize.value),
                fontSize: fontSize
            });
        }

        if (elementsHeight > height) {
            height = elementsHeight;
        }
    }

    return height;
};