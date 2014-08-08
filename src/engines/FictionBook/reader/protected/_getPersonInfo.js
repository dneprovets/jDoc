/**
 *
 * @param xml
 * @return {Object}
 * @private
 */
FictionBook.prototype._getPersonInfo = function (xml) {
    var i,
        nodes = $.children(xml),
        len = nodes.length,
        info = {};

    for (i = len - 1; i >= 0; i--) {
        // firstName, middleName, lastName
        if (nodes[i].localName) {
            info[nodes[i].localName.replace(/-\w+$/, '') + "Name"] = nodes[i].textContent || "";
        }
    }

    return info;
};