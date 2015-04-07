/**
 *
 * @param params
 * @returns {*}
 * @private
 */
ODF.prototype._getStyleRules = function (params) {
    var result = {},
        i = params.children.length;

    while (i--) {
        if (params.children[i]) {
            result[params.children[i]] = {
                css: {},
                dimensionCssRules: {}
            };

            if (params.documentData.styles && params.documentData.styles.defaults) {

                if (params.documentData.styles.defaults[params.children[i]]) {
                    result[params.children[i]].css =
                        clone(params.documentData.styles.defaults[params.children[i]].css);
                    result[params.children[i]].dimensionCssRules =
                        clone(params.documentData.styles.defaults[params.children[i]].dimensionCssRules);
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
                            result[params.children[i]].dimensionCssRules,
                            params.documentData.styles.defaults.named[params.styleName][params.children[i]].dimensionCssRules
                        );
                    }
                }
            }

            if (params.styles) {
                if (params.styles[params.children[i]]) {
                    copy(result[params.children[i]].css, params.styles[params.children[i]].css);
                    copy(
                        result[params.children[i]].dimensionCssRules,
                        params.styles[params.children[i]].dimensionCssRules
                    );
                }

                if (params.styles.named && params.styles.named[params.styleName]) {
                    if (params.styles.named[params.styleName][params.children[i]]) {
                        copy(
                            result[params.children[i]].css,
                            params.styles.named[params.styleName][params.children[i]].css
                        );
                        copy(
                            result[params.children[i]].dimensionCssRules,
                            params.styles.named[params.styleName][params.children[i]].dimensionCssRules
                        );
                    }
                }
            }
        }
    }

    return result;
};