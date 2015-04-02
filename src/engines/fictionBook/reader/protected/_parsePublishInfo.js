/**
 * @param xml
 * @return {Object}
 * @private
 */
FictionBook.prototype._parsePublishInfo = function (xml) {
    var nodes = $.children(xml),
        i = nodes.length,
        info = {};

    while (i--) {
        info[nodes[i].localName] = nodes[i].textContent || "";
    }

    return info;
};