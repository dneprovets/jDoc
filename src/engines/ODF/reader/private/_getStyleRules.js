/**
 *
 * @param params
 * @returns {*}
 * @private
 */
jDoc.engines.ODF.prototype._getStyleRules = function (params) {
    var result = {},
        i;

    for (i = params.elements.length - 1; i >= 0; i--) {
        if (params.elements[i]) {
            result[params.elements[i]] = {
                css: {},
                dimensionCSSRules: {}
            };

            if (params.documentData.styles && params.documentData.styles.defaults) {

                if (params.documentData.styles.defaults[params.elements[i]]) {
                    result[params.elements[i]].css =
                        jDoc.clone(params.documentData.styles.defaults[params.elements[i]].css);
                    result[params.elements[i]].dimensionCSSRules =
                        jDoc.clone(params.documentData.styles.defaults[params.elements[i]].dimensionCSSRules);
                }

                if (
                    params.documentData.styles.defaults.named &&
                        params.documentData.styles.defaults.named[params.styleName]
                ) {
                    if (params.documentData.styles.defaults.named[params.styleName][params.elements[i]]) {
                        jDoc.deepMerge(
                            result[params.elements[i]].css,
                            params.documentData.styles.defaults.named[params.styleName][params.elements[i]].css
                        );
                        jDoc.deepMerge(
                            result[params.elements[i]].dimensionCSSRules,
                            params.documentData.styles.defaults.named[params.styleName][params.elements[i]].dimensionCSSRules
                        );
                    }
                }
            }

            if (params.styles) {
                if (params.styles[params.elements[i]]) {
                    jDoc.deepMerge(result[params.elements[i]].css, params.styles[params.elements[i]].css);
                    jDoc.deepMerge(
                        result[params.elements[i]].dimensionCSSRules,
                        params.styles[params.elements[i]].dimensionCSSRules
                    );
                }

                if (params.styles.named && params.styles.named[params.styleName]) {
                    if (params.styles.named[params.styleName][params.elements[i]]) {
                        jDoc.deepMerge(
                            result[params.elements[i]].css,
                            params.styles.named[params.styleName][params.elements[i]].css
                        );
                        jDoc.deepMerge(
                            result[params.elements[i]].dimensionCSSRules,
                            params.styles.named[params.styleName][params.elements[i]].dimensionCSSRules
                        );
                    }
                }
            }
        }
    }

    return result;
};