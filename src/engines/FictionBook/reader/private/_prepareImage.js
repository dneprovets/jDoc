/**
 *
 * @param options
 * @returns {{options: {isImage: boolean}, attributes: {}}}
 * @private
 */
jDoc.engines.FictionBook.prototype._prepareImage = function (options) {
    var result = {
        options: {
            isImage: true
        },
        css: {},
        dimensionCSSRules: {},
        attributes: {
            src: "",
            alt: ""
        }
    };

    if (
        !options.imageName &&
            options.node &&
            options.node.attributes['l:href'] &&
            options.node.attributes['l:href'].value
    ) {
        result.attributes.src = options.documentData.binaryItems[
            options.node.attributes['l:href'].value.replace("#", '')
        ] || result.attributes.src;
    } else {
        result.attributes.src = options.documentData.binaryItems[options.imageName] || result.attributes.src;
    }

    return result;
};