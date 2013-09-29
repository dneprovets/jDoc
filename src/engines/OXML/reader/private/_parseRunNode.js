/**
 *
 * @param data {Object}
 * @return {Object}
 * @private
 */
jDoc.Engines.OXML.prototype._parseRunNode = function (data) {
    var result = jDoc.deepMerge({}, {
        css:  jDoc.clone(data.documentData.styles.defaults.paragraphContent.css),
        dimensionCSSRules: jDoc.clone(data.documentData.styles.defaults.paragraphContent.dimensionCSSRules),
        options: {
            elementHeight: {
                value: 0,
                units: "pt"
            }
        },
        attributes: {},
        properties: {}
    }, data.cssRules),
        paragraphContentProperties = data.node.querySelector('rPr'),
        paragraphContentText = null,
        paragraphContentImage = data.node.querySelector('drawing'),
        pictureNode = data.node.querySelector('pict'),
        len = data.node.attributes.length,
        pictureGroup,
        partInfo = {},
        textBoxContentChildren,
        textBoxContentChildrenCount,
        imageData = null,
        textBox,
        attrName,
        mediaData,
        inlineNode,
        extentNode,
        horizontalPositionNode,
        verticalPositionNode,
        effectExtentNode,
        optionsNode,
        blipNode,
        offsetNode,
        extentsNode,
        geometryNode,
        offset = 0,
        textBoxContent,
        styleProperties,
        pictureNodeChildren,
        k,
        j;

    for (k = 0; k < len; k++) {
        if (data.node.attributes[k].value) {
            result[this._replaceAttributeNamespace(data.node.attributes[k].name)] =
                isNaN(data.node.attributes[k].value) ? data.node.attributes[k].value : +data.node.attributes[k].value;
        }
    }

    if (paragraphContentProperties) {
        styleProperties = this._getTextDocumentStyleProperties({
            node: paragraphContentProperties,
            documentData: data.documentData
        });
        jDoc.deepMerge(result.css, styleProperties.css);
        jDoc.deepMerge(result.dimensionCSSRules, styleProperties.dimensionCSSRules);
    }

    if (pictureNode) {
        pictureGroup = pictureNode.querySelector('group');

        if (pictureGroup) {
            jDoc.deepMerge(result, {
                css: {},
                dimensionCSSRules: {},
                parts: [],
                options: {
                    isSchema: true
                }
            });

            if (pictureGroup.attributes.style && pictureGroup.attributes.style.value) {
                jDoc.deepMerge(result, this._parseStyleAttribute(pictureGroup.attributes.style.value));

                delete result.dimensionCSSRules.margin;
            }

            result.css.margin = "auto";
            result.css.position = "relative";
            result.css.overflow = "hidden";
            result.css.textIndent = 0;

            if (result.dimensionCSSRules.height) {
                result.options.elementHeight.value = result.dimensionCSSRules.height.value;
            }

            partInfo = {};
            imageData = null;
            pictureNodeChildren = jDoc.DOM.children(pictureGroup);
            len = pictureNodeChildren.length;

            for (k = 0; k < len; k++) {
                partInfo = {
                    css: {},
                    dimensionCSSRules: {},
                    attributes: {},
                    elements: [],
                    options: {
                        backgroundRelationID: null
                    }
                };
                switch (pictureNodeChildren[k].localName) {
                    case "shape":
                        if (
                            pictureNodeChildren[k].attributes.style &&
                                pictureNodeChildren[k].attributes.style.value
                            ) {
                            jDoc.deepMerge(
                                partInfo,
                                this._parseStyleAttribute(
                                    pictureNodeChildren[k].attributes.style.value,
                                    {
                                        denominator: 20
                                    }
                                )
                            );
                        }
                        if (pictureNodeChildren[k].attributes.strokeweight &&
                            pictureNodeChildren[k].attributes.strokeweight.value) {
                            partInfo.css.borderStyle = "solid";
                            partInfo.dimensionCSSRules.borderWidth = {
                                value: 1,
                                units: "px"
                            };
                            partInfo.css.borderColor = "#000000";
                            if (this._cropUnits(partInfo.css.height)) {
                                partInfo.css.height = (this._cropUnits(partInfo.css.height) - 2) + "px";
                            }
                            if (this._cropUnits(partInfo.css.width)) {
                                partInfo.css.width = (this._cropUnits(partInfo.css.width) - 2) + "px";
                            }
                        }
                        imageData = pictureNodeChildren[k].querySelector('imagedata');
                        if (imageData) {
                            if (
                                imageData.attributes['o:title'] &&
                                    imageData.attributes['o:title'].value
                                ) {
                                partInfo.attributes.title = imageData.attributes['o:title'].value;
                            }
                            if (
                                imageData.attributes['r:id'] && imageData.attributes['r:id'].value
                            ) {
                                mediaData = this._getMediaFromRelation({
                                    relationId: imageData.attributes['r:id'].value,
                                    documentData: data.documentData
                                });

                                if (mediaData) {
                                    partInfo.css.backgroundImage = 'url("' + mediaData.data + '")';
                                    partInfo.css.backgroundRepeat = "no-repeat";
                                }
                            }
                        }
                        partInfo.css.zIndex = k + 2;
                        result.parts.push(partInfo);
                        break;
                    case "rect":
                        if (
                            pictureNodeChildren[k].attributes.style &&
                                pictureNodeChildren[k].attributes.style.value
                            ) {
                            jDoc.deepMerge(
                                partInfo,
                                this._parseStyleAttribute(
                                    pictureNodeChildren[k].attributes.style.value,
                                    {
                                        denominator: 20
                                    }
                                )
                            );
                        }

                        if (pictureNodeChildren[k].attributes.strokeweight &&
                            pictureNodeChildren[k].attributes.strokeweight.value) {
                            partInfo.css.borderStyle = "solid";
                            partInfo.dimensionCSSRules.borderWidth = {
                                value: 1,
                                units: "px"
                            };
                            partInfo.css.borderColor = "#000000";
                            if (this._cropUnits(partInfo.css.height)) {
                                partInfo.dimensionCSSRules.height = {
                                    value: (this._cropUnits(partInfo.css.height) - 2),
                                    units: "px"
                                };
                            }
                            if (this._cropUnits(partInfo.css.width)) {
                                partInfo.dimensionCSSRules.width = {
                                    value: (this._cropUnits(partInfo.css.width) - 2),
                                    units: "px"
                                };
                            }
                        }

                        textBox = pictureNodeChildren[k].querySelector('textbox');

                        if (textBox) {
                            textBoxContent = textBox.querySelector('txbxContent');

                            if (textBoxContent) {
                                textBoxContentChildren = jDoc.DOM.children(textBoxContent);
                                textBoxContentChildrenCount = textBoxContentChildren.length;

                                for (j = 0; j < textBoxContentChildrenCount; j++) {
                                    if (textBoxContentChildren[j].localName === "p") {
                                        partInfo.elements.push(
                                            this._parseTextDocumentParagraphNode({
                                                node: textBoxContentChildren[j],
                                                cssRules: {
                                                    css: {
                                                        wordWrap: "normal",
                                                        wordBreak: "normal",
                                                        width: "auto"
                                                    }
                                                },
                                                documentData: data.documentData
                                            })
                                        );
                                    }
                                }
                            }
                        }
                        partInfo.css.zIndex = k + 2;
                        result.parts.push(partInfo);
                        break;
                }
            }
        }
    } else if (paragraphContentImage) {
        inlineNode = paragraphContentImage.querySelector('inline');
        extentNode = paragraphContentImage.querySelector('extent');
        horizontalPositionNode = paragraphContentImage.querySelector('positionH');
        verticalPositionNode = paragraphContentImage.querySelector('positionV');
        effectExtentNode = paragraphContentImage.querySelector('effectExtent');
        optionsNode = paragraphContentImage.querySelector('docPr');
        blipNode = paragraphContentImage.querySelector('blip');
        offsetNode = paragraphContentImage.querySelector('off');
        extentsNode = paragraphContentImage.querySelector('ext');
        geometryNode = paragraphContentImage.querySelector('prstGeom');

        jDoc.deepMerge(result.options, {
            isImage: true,
                isHidden: false,
                relationID: "",
                offset: {},
            extents: {},
            shapeType: "",
                inline: {
                extent: {},
                effectExtent: {
                    left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0
                }
            },
            nonVisualProperties: {}
        });

        if (geometryNode) {
            result.options.shapeType =
                geometryNode.attributes['prst'] ? this._prepareShapeType(geometryNode.attributes['prst']) : "";
        }
        if (blipNode && blipNode.attributes['r:embed'] && blipNode.attributes['r:embed'].value) {
            mediaData = this._getMediaFromRelation({
                relationId: blipNode.attributes['r:embed'].value,
                documentData: data.documentData
            });

            if (mediaData) {
                result.attributes.src = mediaData.data;
            }
        }
        if (offsetNode) {
            if (!isNaN(offsetNode.attributes['y'])) {
                result.options.offset.top = {
                    value: +offsetNode.attributes['y'],
                    units: "pt"
                };
            }

            if (!isNaN(offsetNode.attributes['x'])) {
                result.options.offset.left = {
                    value: +offsetNode.attributes['x'],
                    units: "pt"
                };
            }
        }
        if (horizontalPositionNode) {
            offset = horizontalPositionNode.querySelector('posOffset');
            result.css.position = "absolute";
            if (
                horizontalPositionNode.attributes['relativeFrom'] &&
                    (
                        horizontalPositionNode.attributes['relativeFrom'].value == 'column' ||
                            horizontalPositionNode.attributes['relativeFrom'].value == 'character'
                        )
                ) {
                result.options.relativeParentPosition = true;
            }
            if (offset && offset.textContent) {
                result.dimensionCSSRules.left = this._convertEMU(offset.textContent);
            }
        }
        if (verticalPositionNode) {
            offset = verticalPositionNode.querySelector('posOffset');
            result.css.position = "absolute";
            if (
                verticalPositionNode.attributes['relativeFrom'] &&
                    (
                        verticalPositionNode.attributes['relativeFrom'].value == 'column' ||
                            verticalPositionNode.attributes['relativeFrom'].value == 'character'
                        )
                ) {
                result.options.relativeParentPosition = true;
            }
            if (offset && offset.textContent) {
                result.dimensionCSSRules.top = this._convertEMU(offset.textContent);
            }
        }
        if (extentsNode) {
            if (!isNaN(extentsNode.attributes['y'])) {
                result.options.extents.top = {
                    value: +extentsNode.attributes['y'],
                    units: "pt"
                };
            }

            if (!isNaN(extentsNode.attributes['x'])) {
                result.options.extents.left = {
                    value: +extentsNode.attributes['x'],
                    units: "pt"
                };
            }
        }
        if (inlineNode) {
            len = inlineNode.attributes.length;
            for (k = 0; k < len; k++) {
                if (inlineNode.attributes[k].value) {
                    result.options.inline[
                        this._replaceAttributeNamespace(inlineNode.attributes[k].name)
                    ] = isNaN(inlineNode.attributes[k].value) ?
                        inlineNode.attributes[k].value :
                        +inlineNode.attributes[k].value;
                }
            }
        }
        if (optionsNode) {
            result.attributes.id = (
                optionsNode.attributes['id'] && optionsNode.attributes['id'].value
            ) || result.attributes.id;
            result.attributes.name = (
                optionsNode.attributes['name'] && optionsNode.attributes['name'].value
            ) || result.attributes.name;
            result.options.isHidden = this._attributeToBoolean(optionsNode.attributes['descr']);
            result.attributes.alt = (
                optionsNode.attributes['descr'] && optionsNode.attributes['descr'].value
            ) || result.attributes.alt;
        }
        if (extentNode) {
            if (extentNode.attributes['cy'] && !isNaN(extentNode.attributes['cy'].value)) {
                result.dimensionCSSRules.height = this._convertEMU(extentNode.attributes['cy'].value);
            }
            if (extentNode.attributes['cx'] && !isNaN(extentNode.attributes['cx'].value)) {
                result.dimensionCSSRules.width = this._convertEMU(extentNode.attributes['cx'].value);
            }
        }
        if (effectExtentNode) {
            len = effectExtentNode.attributes.length;
            for (k = 0; k < len; k++) {
                if (effectExtentNode.attributes[k].value) {
                    attrName = this._replaceAttributeNamespace(effectExtentNode.attributes[k].name);

                    switch (attrName) {
                        case "l":
                            if (!isNaN(effectExtentNode.attributes[k].value)) {
                                result.options.inline.effectExtent.left = {
                                    value: +effectExtentNode.attributes[k].value,
                                    units: "pt"
                                };
                            }
                            break;
                        case "r":
                            if (!isNaN(effectExtentNode.attributes[k].value)) {
                                result.options.inline.effectExtent.right = {
                                    value: +effectExtentNode.attributes[k].value,
                                    units: "pt"
                                };
                            }
                            break;
                        case "b":
                            if (!isNaN(effectExtentNode.attributes[k].value)) {
                                result.options.inline.effectExtent.bottom = {
                                    value: +effectExtentNode.attributes[k].value,
                                    units: "pt"
                                };
                            }
                            break;
                        case "top":
                            if (!isNaN(effectExtentNode.attributes[k].value)) {
                                result.options.inline.effectExtent.bottom = {
                                    value: +effectExtentNode.attributes[k].value,
                                    units: "pt"
                                };
                            }
                            break;
                        default:
                            result.options.inline.effectExtent[attrName] = effectExtentNode.attributes[k].value;
                    }
                }
            }
        }

        if (result.dimensionCSSRules.height) {
            result.options.elementHeight.value = result.dimensionCSSRules.height.value;
        }
    } else {
        paragraphContentText = data.node.querySelector('t');
        result.properties.textContent = paragraphContentText ? paragraphContentText.textContent || '' : '';

        if (/^\s+$/.test(result.properties.textContent)) {
            result.properties.textContent = result.properties.textContent.replace(/\s/g, '\u2000');
        }
    }

    return result;
};