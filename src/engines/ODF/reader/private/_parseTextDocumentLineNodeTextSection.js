/**
 * 
 * @param params
 * @returns {*}
 * @private
 */
jDoc.Engines.ODF.prototype._parseTextDocumentParagraphNodeTextSection = function (params) {
    var children = jDoc.DOM.children(params.node),
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
            elements: ['paragraphContent']
        });

        jDoc.deepMerge(result, styleRules.paragraph);
    }

    for (i = 0; i < len; i++) {
        params.properties.textContent += children[i].textContent;
    }

    return data;
};