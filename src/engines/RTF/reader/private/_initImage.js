/**
 *
 * @param params
 * @returns {*}
 * @private
 */
jDoc.engines.RTF.prototype._initImage = function (params) {
    params = params || {};

    var image = jDoc.deepMerge(params.data || {}, {
        options: {
            isImage: true
        },
        properties: {},
        attributes: {},
        css: {},
        dimensionCSSRules: {}
    });

    delete image.options.isParagraph;

    return image;
};