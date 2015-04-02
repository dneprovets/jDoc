/**
 *
 * @param options
 * @returns {*}
 * @private
 */
FictionBook.prototype._prepareImage = function (options) {
    options = options || {};

    var result = {
            options: {
                isImage: true
            },
            css: {},
            dimensionCssRules: {},
            attributes: {
                src: "",
                alt: ""
            }
        },
        node = options.node;

    if (
        !options.imageName &&
            node &&
            node.attributes['l:href'] &&
            node.attributes['l:href'].value
    ) {
        result.attributes.src = options.documentData.binaryItems[
            node.attributes['l:href'].value.replace("#", '')
        ] || result.attributes.src;
    } else {
        result.attributes.src = options.documentData.binaryItems[options.imageName] || result.attributes.src;
    }

    return result;
};