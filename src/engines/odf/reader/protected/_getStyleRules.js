/**
 *
 * @param params
 * @returns {*}
 * @private
 */
ODF.prototype._getStyleRules = function (params) {
    var result = {},
        i;

    for (i = params.children.length - 1; i >= 0; i--) {
        if (params.children[i]) {
            result[params.children[i]] = {
                css: {},
                dimensionCSSRules: {}
            };

            if (params.documentData.styles && params.documentData.styles.defaults) {

                if (params.documentData.styles.defaults[params.children[i]]) {
                    result[params.children[i]].css =
                        clone(params.documentData.styles.defaults[params.children[i]].css);
                    result[params.children[i]].dimensionCSSRules =
                        clone(params.documentData.styles.defaults[params.children[i]].dimensionCSSRules);
                }

                if (
                    params.documentData.styles.defaults.named &&
                        params.documentData.styles.defaults.named[params.styleName]
                ) {
                    if (params.documentData.styles.defaults.named[params.styleName][params.children[i]]) {
                        copy(
                            result[params.children[i]].css,
                            params.documentData.styles.defaults.named[params.styleName][params.children[i]].css
                        );
                        copy(
                            result[params.children[i]].dimensionCSSRules,
                            params.documentData.styles.defaults.named[params.styleName][params.children[i]].dimensionCSSRules
                        );
                    }
                }
            }

            if (params.styles) {
                if (params.styles[params.children[i]]) {
                    copy(result[params.children[i]].css, params.styles[params.children[i]].css);
                    copy(
                        result[params.children[i]].dimensionCSSRules,
                        params.styles[params.children[i]].dimensionCSSRules
                    );
                }

                if (params.styles.named && params.styles.named[params.styleName]) {
                    if (params.styles.named[params.styleName][params.children[i]]) {
                        copy(
                            result[params.children[i]].css,
                            params.styles.named[params.styleName][params.children[i]].css
                        );
                        copy(
                            result[params.children[i]].dimensionCSSRules,
                            params.styles.named[params.styleName][params.children[i]].dimensionCSSRules
                        );
                    }
                }
            }
        }
    }

    return result;
};