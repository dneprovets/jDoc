/**
 *
 * @description Parsing information about document
 * @param xml
 * @private
 * @return {Object}
 */
jDoc.engines.OXML.prototype._parseDocumentInfo = function (xml) {
    var i,
        children = jDoc.DOM.children(xml),
        result = {
            creator: "",
            lastModifiedBy: "",
            revision: 0,
            dateCreated: null,
            dateModified: null
        };

    for (i = children.length - 1; i >= 0; i--) {
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