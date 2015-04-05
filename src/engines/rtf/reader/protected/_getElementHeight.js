/**
 *
 * @param element
 * @param options
 * @returns {number}
 * @private
 */
RTF.prototype._getElementHeight = {
    value (element, options = {}) {
        var dimensionCssRules = element.dimensionCssRules,
            height = (dimensionCssRules.height && dimensionCssRules.height.value) || 0,
            i,
            textContent,
            fontSize,
            elementsHeight = 0,
            lineHeight = (dimensionCssRules.lineHeight && dimensionCssRules.lineHeight.value) || 0,
            width = options.width || 0,
            len;

        if (lineHeight > height) {
            height = lineHeight;
        }

        height += (dimensionCssRules.marginTop && dimensionCssRules.marginTop.value) || 0;
        height += (dimensionCssRules.marginBottom && dimensionCssRules.marginBottom.value) || 0;
        height += (dimensionCssRules.paddingTop && dimensionCssRules.paddingTop.value) || 0;
        height += (dimensionCssRules.paddingBottom && dimensionCssRules.paddingBottom.value) || 0;

        if (width) {
            width -= (dimensionCssRules.paddingLeft && dimensionCssRules.paddingLeft.value) || 0;
            width -= (dimensionCssRules.paddingRight && dimensionCssRules.paddingRight.value) || 0;
            width -= (dimensionCssRules.marginLeft && dimensionCssRules.marginLeft.value) || 0;
            width -= (dimensionCssRules.marginRight && dimensionCssRules.marginRight.value) || 0;
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
                        textContent
                    },
                    lineHeight: lineHeight / fontSize,
                    width,
                    parentFontSize: (dimensionCssRules.fontSize && dimensionCssRules.fontSize.value),
                    fontSize
                });
            }

            if (elementsHeight > height) {
                height = elementsHeight;
            }
        }

        return height;
    }
};