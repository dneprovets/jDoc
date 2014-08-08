/**
 * 
 * @param params
 * @returns {*}
 * @private
 */
ODF.prototype._parseTextDocumentParagraphNodeTextSection = function (params) {
    var children = $.children(params.node),
        i,
        len = children.length,
        styleRules,
        result = {
            css: {},
            dimensionCSSRules: {},
            attributes: {},
            properties: {
                textContent: ""
            },
            options: {}
        };

    if (params.node.attributes['text:style-name'] && params.node.attributes['text:style-name'].value) {
        styleRules  = this._getStyleRules({
            documentData: params.documentData,
            styles: params.styles,
            styleName: params.node.attributes['text:style-name'].value,
            children: ['paragraphContent']
        });

        copy(result, styleRules.paragraph);
    }

    for (i = 0; i < len; i++) {
        result.properties.textContent += children[i].textContent;
    }

    return result;
};