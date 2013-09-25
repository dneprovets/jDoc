/**
 *
 * @param params
 * @return {Object}
 * @private
 */
jDoc.Engines.OXML.prototype._parseTextDocumentParagraphNode = function (params) {
    var elementInfo = {
        options: {
            isParagraph: true,
            pageBreak: false,
            elementHeight: {
                value: params.documentData.styles.defaults.options.linePitch ?
                    params.documentData.styles.defaults.options.linePitch.value : 0,
                units: "pt"
            }
        },
        attributes: {},
        css:  jDoc.deepMerge({}, params.documentData.styles.defaults.paragraph.css,
            params.cssRules ? params.cssRules.css : {}),
        dimensionCSSRules: jDoc.deepMerge({}, params.documentData.styles.defaults.paragraph.dimensionCSSRules,
            params.cssRules ? params.cssRules.dimensionCSSRules : {}),
        elements: []
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
            units: "pt"
        },
        letterWidth = {
            value: defaultFontSize.value / 2,
            units: "pt"
        },
        elementHeight,
        linesCount,
        maxFontSize = 0,
        n,
        styleProperties,
        children = jDoc.DOM.children(params.node),
        len,
        textContentLength = 0,
        length = params.node.attributes.length;

    for (k = 0; k < length; k++) {
        if (params.node.attributes[k].value) {
            elementInfo[this._replaceAttributeNamespace(params.node.attributes[k].name)] =
                isNaN(params.node.attributes[k].value) ? params.node.attributes[k].value : +params.node.attributes[k].value;
        }
    }

    length = children.length;

    for (n = 0; n < length; n++) {
        switch (children[n].localName) {
        case "bookmarkStart":
            if (children[n].attributes['w:name'] && children[n].attributes['w:name'].value) {
                elementInfo.elements.push({
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
                 * Clear default styles for paragraph
                 * @type {{}}
                 */
                elementInfo.css = {};
                elementInfo.dimensionCSSRules = {};
            }

            jDoc.deepMerge(elementInfo.css, styleProperties.css);
            jDoc.deepMerge(elementInfo.dimensionCSSRules, styleProperties.dimensionCSSRules);
            jDoc.deepMerge(elementInfo.attributes, styleProperties.attributes);

            elementInfo.options.childrenCSSRules = styleProperties.options.childrenCSSRules;

            if (elementInfo.dimensionCSSRules.height) {
                elementInfo.options.elementHeight.value = elementInfo.dimensionCSSRules.height.value;
            }

            if (
                elementInfo.dimensionCSSRules.minHeight &&
                elementInfo.dimensionCSSRules.minHeight.value > elementInfo.options.elementHeight.value
            ) {
                elementInfo.options.elementHeight.value = elementInfo.dimensionCSSRules.minHeight.value;
            }

            break;
        case "hyperlink":
            hyperLinkChildren = jDoc.DOM.children(children[n]);
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
                elements: []
            };
            for (k = 0; k < len; k++) {
                hyperLinkChildrenElement = this._parseRunNode({
                    node: hyperLinkChildren[k],
                    cssRules: elementInfo.options.childrenCSSRules,
                    documentData: params.documentData
                });
                hyperLinkChildrenElement.css.color = "";

                if (
                    hyperLinkChildrenElement.dimensionCSSRules.fontSize &&
                        hyperLinkChildrenElement.dimensionCSSRules.fontSize.value > maxFontSize
                ) {
                    maxFontSize = hyperLinkChildrenElement.dimensionCSSRules.fontSize.value;
                }

                textContentLength += (
                    hyperLinkChildrenElement.properties.textContent ? (
                        hyperLinkChildrenElement.properties.textContent.length  * (
                            hyperLinkChildrenElement.dimensionCSSRules.fontSize ? (
                                hyperLinkChildrenElement.dimensionCSSRules.fontSize.value / defaultFontSize.value
                            ) : 1
                        )
                    ): 0
                );

                hyperLinkBlock.elements.push(hyperLinkChildrenElement);
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

            elementInfo.elements.push(hyperLinkBlock);

            break;
        case "r":
            element = this._parseRunNode({
                node: children[n],
                cssRules: elementInfo.options.childrenCSSRules,
                documentData: params.documentData
            });

            textContentLength += (element.properties.textContent ? (
                element.properties.textContent.length * (
                    element.dimensionCSSRules.fontSize ? (
                        element.dimensionCSSRules.fontSize.value / defaultFontSize.value
                    ) : 1
                )
            ) : 0);

            if (element.options.elementHeight.value > elementInfo.options.elementHeight.value) {
                elementInfo.options.elementHeight.value = element.options.elementHeight.value;
            }

            if (
                element.dimensionCSSRules.fontSize && element.dimensionCSSRules.fontSize.value > maxFontSize
            ) {
                maxFontSize = element.dimensionCSSRules.fontSize.value;
            }

            elementInfo.elements.push(element);
            break;
        }
    }

    /**
     * Align image on center
     */
    if (elementInfo.elements[0] && elementInfo.elements[0].options.isImage &&!elementInfo.elements[1] && !elementInfo.css.textAlign){
        elementInfo.css.textAlign = "center";
    }

    linesCount = Math.ceil(
        (
            textContentLength * letterWidth.value + (
                elementInfo.dimensionCSSRules.textIndent ? elementInfo.dimensionCSSRules.textIndent.value : 0
            )
        ) / (
            params.documentData.styles.defaults.options.pageContentWidth.value - (
                elementInfo.dimensionCSSRules.paddingLeft ? elementInfo.dimensionCSSRules.paddingLeft.value : 0
            ) - (
                elementInfo.dimensionCSSRules.paddingRight ? elementInfo.dimensionCSSRules.paddingRight.value : 0
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

    if (elementInfo.dimensionCSSRules.marginTop) {
        elementInfo.options.elementHeight.value += elementInfo.dimensionCSSRules.marginTop.value;
    }

    if (elementInfo.dimensionCSSRules.marginBottom) {
        elementInfo.options.elementHeight.value += elementInfo.dimensionCSSRules.marginBottom.value;
    }

    if (elementInfo.dimensionCSSRules.paddingTop) {
        elementInfo.options.elementHeight.value += elementInfo.dimensionCSSRules.paddingTop.value;
    }

    if (elementInfo.dimensionCSSRules.paddingBottom) {
        elementInfo.options.elementHeight.value += elementInfo.dimensionCSSRules.paddingBottom.value;
    }

    return elementInfo;
};