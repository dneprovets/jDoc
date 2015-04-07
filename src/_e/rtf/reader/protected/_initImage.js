/**
 *
 * @param params
 * @returns {*}
 * @private
 */
RTF.prototype._initImage = {
    value (params = {}) {
        var image = copy(params.data || {}, {
            options: {
                isImage: true
            },
            properties: {},
            attributes: {},
            css: {},
            dimensionCssRules: {}
        });

        delete image.options.isParagraph;

        return image;
    }
};