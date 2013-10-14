/**
 * @description Parsing document styles
 * @param xml
 * @return {Object}
 * @private
 */
jDoc.engines.OXML.prototype._parseTextDocumentStyles = function (xml) {
    var result = {
            defaults: {
                paragraph: {
                    dimensionCSSRules: {
                        margin: {
                            value: 0,
                            units: "pt"
                        },
                        padding: {
                            value: 0,
                            units: "pt"
                        }
                    },
                    css: {
                        wordWrap: "break-word",
                        wordBreak: "break-all",
                        width: "100%"
                    }
                },
                paragraphContent: {},
                options: {}
            },
            latentStyles: {
                exceptions: {}
            },
            preferencedStyles: {}
        },
        self = this,
        childrenNodes = jDoc.DOM.children(xml.querySelector('styles')),
        i,
        name,
        data,
        propertiesNode,
        propertyNode,
        cachedAttributesLength,
        cachedArrayLength,
        exceptionsNodes,
        contentStyles,
        paragraphStyles,
        k = 0,
        j = 0;

    for (i = childrenNodes.length - 1; i >= 0; i--) {
        if (childrenNodes[i].localName === "docDefaults") {
            contentStyles = childrenNodes[i].querySelector('rPrDefault rPr');
            paragraphStyles = childrenNodes[i].querySelector('pPrDefault pPr');

            if (contentStyles) {
                result.defaults.paragraphContent = this._getTextDocumentStyleProperties({
                    node: contentStyles,
                    documentData: null
                });
            }
            if (paragraphStyles) {
                jDoc.deepMerge(result.defaults.paragraph,
                    this._getTextDocumentStyleProperties({
                        node: paragraphStyles,
                        documentData: null
                    })
                );
            }
        } else if (childrenNodes[i].localName === 'latentStyles') {
            exceptionsNodes = childrenNodes[i].querySelectorAll('lsdException') || [];
            name = '';
            data = {};
            cachedArrayLength = childrenNodes[i].attributes.length;
            cachedAttributesLength = 0;

            for (k = 0; k < cachedArrayLength; k++) {
                result.latentStyles[self._replaceAttributeNamespace(childrenNodes[i].attributes[k].name)] = (
                    isNaN(childrenNodes[i].attributes[k].value)
                ) ? (childrenNodes[i].attributes[k].value || '') : +childrenNodes[i].attributes[k].value;
            }

            cachedArrayLength = exceptionsNodes.length;

            for (k = 0; k < cachedArrayLength; k++) {
                name = '';
                data = {};
                cachedAttributesLength = exceptionsNodes[k].attributes.length;
                for (j = 0; j < cachedAttributesLength; j++) {
                    if (self._replaceAttributeNamespace(exceptionsNodes[i].attributes[j].name) == 'name') {
                        name = self._replaceAttributeNamespace(exceptionsNodes[i].attributes[j].name);
                        result.latentStyles.exceptions[name] = data;
                    }
                    if (name) {
                        result.latentStyles.exceptions[name][
                            self._replaceAttributeNamespace(exceptionsNodes[i].attributes[j].name)
                        ] = (isNaN(exceptionsNodes[i].attributes[j].value)) ? (
                            exceptionsNodes[i].attributes[j].value || ''
                        ) : +exceptionsNodes[i].attributes[j].value;
                    } else {
                        data[self._replaceAttributeNamespace(exceptionsNodes[i].attributes[j].name)] =
                            (isNaN(exceptionsNodes[i].attributes[j].value)) ? (
                                exceptionsNodes[i].attributes[j].value || ''
                            ) : +exceptionsNodes[i].attributes[j].value;
                    }
                }
            }
        } else if (childrenNodes[i].localName === 'style') {
            if (childrenNodes[i].attributes["w:styleId"] && childrenNodes[i].attributes["w:styleId"].value) {
                result.preferencedStyles[childrenNodes[i].attributes["w:styleId"].value] = {
                    contentProperties: {},
                    isDefault: this._attributeToBoolean(childrenNodes[i].attributes["w:default"])
                };

                propertiesNode = childrenNodes[i].querySelector('pPr');

                if (propertiesNode) {
                    result.preferencedStyles[childrenNodes[i].attributes["w:styleId"].value].lineStyle =
                        this._getTextDocumentStyleProperties({
                            node: propertiesNode,
                            documentData: null
                        });
                }
                propertiesNode = childrenNodes[i].querySelector('rPr');
                if (propertiesNode) {
                    result.preferencedStyles[childrenNodes[i].attributes["w:styleId"].value].contentProperties =
                        this._getTextDocumentStyleProperties({
                            node: propertiesNode,
                            documentData: null
                        });
                }
                propertiesNode = childrenNodes[i].querySelector('tblPr');
                if (propertiesNode) {
                    result.preferencedStyles[childrenNodes[i].attributes["w:styleId"].value].tableStyle =
                        this._getTextDocumentStyleProperties({
                            node: propertiesNode,
                            documentData: null
                        });
                }
                result.preferencedStyles[childrenNodes[i].attributes["w:styleId"].value].type = (
                    childrenNodes[i].attributes["w:type"] && childrenNodes[i].attributes["w:type"].value
                ) ? childrenNodes[i].attributes["w:type"].value : "";

                propertyNode = childrenNodes[i].querySelector('name');

                if (propertyNode && propertyNode.attributes['w:val'] && propertyNode.attributes['w:val'].value) {
                    result.preferencedStyles[childrenNodes[i].attributes["w:styleId"].value].name =
                        propertyNode.attributes['w:val'].value;
                }
                propertyNode = childrenNodes[i].querySelector('rsid');
                if (propertyNode && propertyNode.attributes['w:val'] && propertyNode.attributes['w:val'].value) {
                    result.preferencedStyles[childrenNodes[i].attributes["w:styleId"].value].rsid =
                        propertyNode.attributes['w:val'].value;
                }
                propertyNode = childrenNodes[i].querySelector('basedOn');
                if (propertyNode && propertyNode.attributes['w:val'] && propertyNode.attributes['w:val'].value) {
                    result.preferencedStyles[childrenNodes[i].attributes["w:styleId"].value].parentStyleId =
                        propertyNode.attributes['w:val'].value;
                }
                propertyNode = childrenNodes[i].querySelector('next');
                if (propertyNode && propertyNode.attributes['w:val'] && propertyNode.attributes['w:val'].value) {
                    result.preferencedStyles[childrenNodes[i].attributes["w:styleId"].value].nextElementStyle =
                        propertyNode.attributes['w:val'].value;
                }
                propertyNode = childrenNodes[i].querySelector('uiPriority');
                if (propertyNode && propertyNode.attributes['w:val'] && propertyNode.attributes['w:val'].value) {
                    result.preferencedStyles[childrenNodes[i].attributes["w:styleId"].value].uiPriority = +propertyNode.attributes['w:val'].value;
                }
                propertyNode = childrenNodes[i].querySelector('link');
                if (propertyNode && propertyNode.attributes['w:val'] && propertyNode.attributes['w:val'].value) {
                    result.preferencedStyles[childrenNodes[i].attributes["w:styleId"].value].linkedStyle =
                        propertyNode.attributes['w:val'].value;
                }
                propertyNode = childrenNodes[i].querySelector('unhideWhenUsed');
                result.preferencedStyles[childrenNodes[i].attributes["w:styleId"].value].unHideWhenUsed = (
                    propertyNode
                ) ? this._attributeToBoolean(propertyNode.attributes['w:val']) : false;
                propertyNode = childrenNodes[i].querySelector('qFormat');
                result.preferencedStyles[childrenNodes[i].attributes["w:styleId"].value].isPrimary = (
                    propertyNode
                ) ? this._attributeToBoolean(propertyNode.attributes['w:val']) : false;
            }
        }
    }

    return result;
};