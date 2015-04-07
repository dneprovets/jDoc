/**
 *
 * @param xml
 * @return {Object}
 * @private
 */
FictionBook.prototype._getPersonInfo = function (xml) {
    var nodes = $.children(xml),
        i = nodes.length,
        info = {};

    while (i--) {
        // firstName, middleName, lastName
        if (nodes[i].localName) {
            info[nodes[i].localName.replace(/-\w+$/, '') + "Name"] = nodes[i].textContent || "";
        }
    }

    return info;
};