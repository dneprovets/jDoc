/**
 *
 * @description Parsing information about document
 * @param xml
 * @private
 * @return {Object}
 */
OOXML.prototype._parseDocumentInfo = function (xml) {
    var children = $.children(xml),
        i = children.length,
        result = {
            creator: "",
            lastModifiedBy: "",
            revision: 0,
            dateCreated: null,
            dateModified: null
        };

    while (i--) {
        switch (children[i].localName) {
        case "creator":
            result.creator = children[i].textContent || '';
            break;
        case "lastModifiedBy":
            result.lastModifiedBy = children[i].textContent || '';
            break;
        case "revision":
            result.revision = +(children[i].textContent || 0);
            break;
        case "created":
            result.dateCreated = children[i].textContent ? new Date(children[i].textContent) : null;
            break;
        case "modified":
            result.dateModified = children[i].textContent ? new Date(children[i].textContent) : null;
            break;
        }
    }

    return result;
};