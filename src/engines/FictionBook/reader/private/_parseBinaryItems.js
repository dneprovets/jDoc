/**
 *
 * @param nodes
 * @private
 * @returns {*}
 */
jDoc.engines.FictionBook.prototype._parseBinaryItems = function (nodes) {
    var result = {},
        i;

    for (i = nodes.length - 1; i >= 0; i--) {
        if (
            nodes[i].attributes.id &&
                nodes[i].attributes.id.value &&
                nodes[i].attributes["content-type"] &&
                nodes[i].attributes["content-type"].value &&
                nodes[i].textContent
            ) {
            result[nodes[i].attributes.id.value] =
                "data:" + nodes[i].attributes["content-type"].value + ";base64," + nodes[i].textContent;
        }
    }

    return result;
};