/**
 *
 * @param node
 * @returns {*}
 * @private
 */
FictionBook.prototype._parseLinkElement = function (node) {
    var result = {
            options: {
                isLink: true
            },
            attributes: {},
            properties: {
                textContent: ""
            },
            css: {},
            dimensionCssRules: {}
        },
        link = (
            node.attributes['l:href'] && node.attributes['l:href'].value
        ) ? node.attributes['l:href'].value : "";

    result.attributes.href = link;

    if (!(/^#/).test(link)) {
        result.attributes.target = '_blank';
    }

    result.properties.textContent = node.textContent;

    return result;
};