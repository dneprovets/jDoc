/**
 *
 * @param params
 * @returns {*}
 * @private
 */
RTF.prototype._initImage = function (params) {
    params = params || {};

    var image = copy(params.data || {}, {
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