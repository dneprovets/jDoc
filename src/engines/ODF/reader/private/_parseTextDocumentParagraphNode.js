/**
 *
 * @param params
 * @return {Object}
 * @private
 */
jDoc.engines.ODF.prototype._parseTextDocumentParagraphNode = function (params) {
    var result = {
            options: {
                isParagraph: true,
                pageBreak: false
            },
            attributes: {},
            css: {},
            dimensionCSSRules: {
                margin: {
                    value: 0,
                    units: "px"
                },
                padding: {
                    value: 0,
                    units: "px"
                }
            },
            elements: []
        },
        i,
        styleRules = {},
        element,
        len = params.node.childNodes.length;

    if (params.node.attributes['text:style-name'] && params.node.attributes['text:style-name'].value) {
        styleRules  = this._getStyleRules({
            documentData: params.documentData,
            styles: params.styles,
            styleName: params.node.attributes['text:style-name'].value,
            elements: ['paragraph', 'paragraphContent']
        });

        jDoc.deepMerge(result, styleRules.paragraph);
    }

    for (i = 0; i < len; i++) {
        element = jDoc.deepMerge({
            options: {},
            attributes: {},
            properties: {}
        }, styleRules.paragraphContent);

        switch (params.node.childNodes[i].localName) {
        case "tab":
            element.properties.textContent = this._getTabAsSpaces();
            result.elements.push(element);
            break;
        case "soft-page-break":
            result.options.pageBreak = true;
            break;
        case "span":
            element = jDoc.deepMerge({}, element, this._parseTextDocumentParagraphNodeTextSection({
                node: params.node.childNodes[i],
                styles: params.styles,
                documentData: params.documentData
            }));
            result.elements.push(element);
            break;
        case "frame":
            element = jDoc.deepMerge({}, element, this._parseTextDocumentParagraphNodeDrawFrame({
                node: params.node.childNodes[i],
                styles: params.styles,
                documentData: params.documentData
            }));
            result.elements.push(element);
            break;
        default:
            element.properties.textContent = params.node.childNodes[i].textContent;
            result.elements.push(element);
        }
    }

    return result;
};