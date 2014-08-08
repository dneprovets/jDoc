/**
 * @param xml
 * @return {Object}
 * @private
 */
FictionBook.prototype._parsePublishInfo = function (xml) {
    var nodes = $.children(xml),
        i,
        len = nodes.length,
        info = {};

    for (i = len - 1; i >= 0; i--) {
        info[nodes[i].localName] = nodes[i].textContent || "";
    }

    return info;
};