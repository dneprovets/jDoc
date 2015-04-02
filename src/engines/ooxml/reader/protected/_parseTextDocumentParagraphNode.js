/**
 *
 * @param params
 * @return {Object}
 * @private
 */
OOXML.prototype._parseTextDocumentParagraphNode = function (params) {
    var elementInfo = {
        options: {
            isParagraph: true,
            pageBreak: false,
            elementHeight: {
                value: params.documentData.styles.defaults.options.linePitch ?
                    params.documentData.styles.defaults.options.linePitch.value : 0,
                unit: "pt"
            }
        },
        attributes: {},
        css:  copy({}, params.documentData.styles.defaults.paragraph.css,
            params.cssRules ? params.cssRules.css : {}),
        dimensionCssRules: copy({}, params.documentData.styles.defaults.paragraph.dimensionCssRules,
            params.cssRules ? params.cssRules.dimensionCssRules : {}),
        children: []
    },
        hyperLinkChildren,
        hyperLinkChildrenElement,
        hyperLinkBlock,
        k,
        href,
        relation,
        lineHeight,
        element,
        defaultFontSize = {
            value: 14,
            unit: "pt"
        },
        letterWidth = {
            value: defaultFontSize.value / 2,
            unit: "pt"
        },
        elementHeight,
        linesCount,
        maxFontSize = 0,
        n,
        styleProperties,
        children = $.children(params.node),
        len,
        textContentLength = 0,
        length = params.node.attributes.length;

    for (k = 0; k < length; k++) {
        if (params.node.attributes[k].value) {
            elementInfo[this.replaceAttributeNamespace(params.node.attributes[k].name)] =
                isNaN(params.node.attributes[k].value) ? params.node.attributes[k].value : +params.node.attributes[k].value;
        }
    }

    length = children.length;

    for (n = 0; n < length; n++) {
        switch (children[n].localName) {
        case "bookmarkStart":
            if (children[n].attributes['w:name'] && children[n].attributes['w:name'].value) {
                elementInfo.children.push({
                    options: {
                        isLink: true
                    },
                    attributes: {
                        name: children[n].attributes['w:name'].value
                    }
                });
            }
            break;
        case "pPr":
            styleProperties = this._getTextDocumentStyleProperties({
                node: children[n],
                documentData: params.documentData
            });

            if (styleProperties.options.isListItem) {
                elementInfo.options.isParagraph = false;
                elementInfo.options.isListItem = true;
                /**
                 * @description Clear default styles for paragraph
                 * @type {*}
                 */
                elementInfo.css = {};
                elementInfo.dimensionCssRules = {};
            }

            copy(elementInfo.css, styleProperties.css);
            copy(elementInfo.dimensionCssRules, styleProperties.dimensionCssRules);
            copy(elementInfo.attributes, styleProperties.attributes);

            elementInfo.options.childrenCssRules = styleProperties.options.childrenCssRules;

            if (elementInfo.dimensionCssRules.height) {
                elementInfo.options.elementHeight.value = elementInfo.dimensionCssRules.height.value;
            }

            if (
                elementInfo.dimensionCssRules.minHeight &&
                elementInfo.dimensionCssRules.minHeight.value > elementInfo.options.elementHeight.value
            ) {
                elementInfo.options.elementHeight.value = elementInfo.dimensionCssRules.minHeight.value;
            }

            break;
        case "hyperlink":
            hyperLinkChildren = $.children(children[n]);
            len = hyperLinkChildren.length;
            href = "#";

            relation = children[n].attributes['r:id'] ? this._getRelation({
                relationId: children[n].attributes['r:id'].value,
                documentData: params.documentData
            }) : null;
            hyperLinkBlock = {
                options: {
                    isLink: true
                },
                css: {
                    color: "#0000EE"
                },
                attributes: {},
                children: []
            };
            for (k = 0; k < len; k++) {
                hyperLinkChildrenElement = this._parseRunNode({
                    node: hyperLinkChildren[k],
                    cssRules: elementInfo.options.childrenCssRules,
                    documentData: params.documentData
                });
                hyperLinkChildrenElement.css.color = "";

                if (
                    hyperLinkChildrenElement.dimensionCssRules.fontSize &&
                        hyperLinkChildrenElement.dimensionCssRules.fontSize.value > maxFontSize
                ) {
                    maxFontSize = hyperLinkChildrenElement.dimensionCssRules.fontSize.value;
                }

                textContentLength += (
                    hyperLinkChildrenElement.properties.textContent ? (
                        hyperLinkChildrenElement.properties.textContent.length  * (
                            hyperLinkChildrenElement.dimensionCssRules.fontSize ? (
                                hyperLinkChildrenElement.dimensionCssRules.fontSize.value / defaultFontSize.value
                            ) : 1
                        )
                    ): 0
                );

                hyperLinkBlock.children.push(hyperLinkChildrenElement);
            }

            if (relation) {
                href = relation.target;
                hyperLinkBlock.attributes.target = "_blank";
            } else {
                href += (
                    children[n].attributes['w:anchor'] && children[n].attributes['w:anchor'].value
                ) || "";
            }

            hyperLinkBlock.attributes.href = href;

            elementInfo.children.push(hyperLinkBlock);

            break;
        case "r":
            element = this._parseRunNode({
                node: children[n],
                cssRules: elementInfo.options.childrenCssRules,
                documentData: params.documentData
            });

            textContentLength += (element.properties.textContent ? (
                element.properties.textContent.length * (
                    element.dimensionCssRules.fontSize ? (
                        element.dimensionCssRules.fontSize.value / defaultFontSize.value
                    ) : 1
                )
            ) : 0);

            if (element.options.elementHeight.value > elementInfo.options.elementHeight.value) {
                elementInfo.options.elementHeight.value = element.options.elementHeight.value;
            }

            if (
                element.dimensionCssRules.fontSize && element.dimensionCssRules.fontSize.value > maxFontSize
            ) {
                maxFontSize = element.dimensionCssRules.fontSize.value;
            }

            elementInfo.children.push(element);
            break;
        }
    }

    if (elementInfo.children[0] && elementInfo.children[0].options.isImage) {
        /**
         * Align image on center
         */
        if (!elementInfo.children[1] && !elementInfo.css.textAlign){
            elementInfo.css.textAlign = "center";
        }
        if (elementInfo.children[0].options.parentCss) {
            copy(elementInfo.css, elementInfo.children[0].options.parentCss);
        }
        if (elementInfo.children[0].options.parentDimensionCssRules) {
            copy(elementInfo.dimensionCssRules, elementInfo.children[0].options.parentDimensionCssRules);
        }
    }

    linesCount = Math.ceil(
        (
            textContentLength * letterWidth.value + (
                elementInfo.dimensionCssRules.textIndent ? elementInfo.dimensionCssRules.textIndent.value : 0
            )
        ) / (
            params.documentData.styles.defaults.options.pageContentWidth.value - (
                elementInfo.dimensionCssRules.paddingLeft ? elementInfo.dimensionCssRules.paddingLeft.value : 0
            ) - (
                elementInfo.dimensionCssRules.paddingRight ? elementInfo.dimensionCssRules.paddingRight.value : 0
            )
        )
    );

    lineHeight = elementInfo.css.lineHeight ? elementInfo.css.lineHeight : 1;

    maxFontSize *= lineHeight;

    if (linesCount == 1 && maxFontSize > elementInfo.options.elementHeight.value) {
        elementInfo.options.elementHeight.value = maxFontSize;
    } else {
        elementHeight = linesCount * defaultFontSize.value * lineHeight;

        if (elementHeight > elementInfo.options.elementHeight.value) {
            elementInfo.options.elementHeight.value = elementHeight;
        }
    }

    if (elementInfo.dimensionCssRules.marginTop) {
        elementInfo.options.elementHeight.value += elementInfo.dimensionCssRules.marginTop.value;
    }

    if (elementInfo.dimensionCssRules.marginBottom) {
        elementInfo.options.elementHeight.value += elementInfo.dimensionCssRules.marginBottom.value;
    }

    if (elementInfo.dimensionCssRules.paddingTop) {
        elementInfo.options.elementHeight.value += elementInfo.dimensionCssRules.paddingTop.value;
    }

    if (elementInfo.dimensionCssRules.paddingBottom) {
        elementInfo.options.elementHeight.value += elementInfo.dimensionCssRules.paddingBottom.value;
    }

    return elementInfo;
};