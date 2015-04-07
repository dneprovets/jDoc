/**
 * @param xml
 * @param documentData
 * @return {Object}
 * @private
 */
FictionBook.prototype._parseDocumentInfo = function (xml, documentData) {
    var nodes = $.children(xml),
        i = nodes.length,
        j,
        arr,
        tmp,
        info = {
            isTextDocument: true,
            programs: []
        };

    while (i--) {
        switch (nodes[i].localName) {
            case "author":
                info.author = this._getPersonInfo(nodes[i]);
                break;
            case "src-url":
                info.sourceURL = nodes[i].textContent || "";
                break;
            case "id":
                info.id = nodes[i].textContent || "";
                break;
            case "version":
                info.version = nodes[i].textContent || "";
                break;
            case "history":
                info.history = this._prepareBlock(nodes[i], documentData);
                break;
            case "date":
                arr = (nodes[i].textContent || "").split("-");
                tmp = arr[0];
                arr[0] = arr[2];
                arr[2] = tmp;
                info.date = arr.join('.');
                break;
            case "program-used":
                arr = (nodes[i].textContent || "").split(",");
                j = arr.length;

                while (j--) {
                    info.programs[j] = arr[j].replace(/^\s+/, '');
                }
                break;
        }
    }

    return info;
};