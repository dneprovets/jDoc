/**
 *
 * @param params
 * @return {Object}
 * @private
 */
ODF.prototype._parseTextDocumentParagraphNode = function (params) {
    var result = {
            options: {
                isParagraph: true,
                pageBreak: false
            },
            attributes: {},
            css: {},
            dimensionCssRules: {
                margin: {
                    value: 0,
                    unit: "px"
                },
                padding: {
                    value: 0,
                    unit: "px"
                }
            },
            children: []
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
            children: ['paragraph', 'paragraphContent']
        });

        copy(result, styleRules.paragraph);
    }

    for (i = 0; i < len; i++) {
        element = copy({
            options: {},
            attributes: {},
            properties: {}
        }, styleRules.paragraphContent);

        switch (params.node.childNodes[i].localName) {
        case "tab":
            element.properties.textContent = this.tabAsSpaces;
            result.children.push(element);
            break;
        case "soft-page-break":
            result.options.pageBreak = true;
            break;
        case "span":
            element = copy({}, element, this._parseTextDocumentParagraphNodeTextSection({
                node: params.node.childNodes[i],
                styles: params.styles,
                documentData: params.documentData
            }));
            result.children.push(element);
            break;
        case "frame":
            element = copy({}, element, this._parseTextDocumentParagraphNodeDrawFrame({
                node: params.node.childNodes[i],
                styles: params.styles,
                documentData: params.documentData
            }));
            result.children.push(element);
            break;
        default:
            element.properties.textContent = params.node.childNodes[i].textContent;
            result.children.push(element);
        }
    }

    return result;
};