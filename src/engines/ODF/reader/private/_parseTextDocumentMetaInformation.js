/**
 *
 * @param xml
 * @return {Object}
 * @private
 */
jDoc.engines.ODF.prototype._parseTextDocumentMetaInformation = function (xml) {
    var result = {
            documentInfo: {},
            applicationInfo: {}
        },
        infoNode = xml.querySelector('meta'),
        i,
        nodes = jDoc.DOM.children(infoNode),
        length = nodes.length;

    if (infoNode) {
        for (i = 0; i < length; i++) {
            switch (nodes[i].localName) {
            case "initial-creator":
            case "creator":
                if (nodes[i].textContent) {
                    result.documentInfo.creator = nodes[i].textContent;
                }
                break;
            case "creation-date":
                if (nodes[i].textContent) {
                    result.documentInfo.dateCreated = new Date(nodes[i].textContent);
                }
                break;
            case "date":
                if (nodes[i].textContent) {
                    result.documentInfo.dateModified = new Date(nodes[i].textContent);
                }
                break;
            case "generator":
                if (nodes[i].textContent) {
                    result.applicationInfo.application = nodes[i].textContent;
                }
                break;
            case "document-statistic":
                result.documentInfo.tableCount = (
                    nodes[i].attributes['meta:table-count'] && !isNaN(nodes[i].attributes['meta:table-count'].value)
                ) ? +nodes[i].attributes['meta:table-count'].value : 0;

                result.documentInfo.imageCount = (
                    nodes[i].attributes['meta:image-count'] && !isNaN(nodes[i].attributes['meta:image-count'].value)
                ) ? +nodes[i].attributes['meta:image-count'].value : 0;

                result.documentInfo.objectCount = (
                    nodes[i].attributes['meta:object-count'] && !isNaN(nodes[i].attributes['meta:object-count'].value)
                ) ? +nodes[i].attributes['meta:object-count'].value : 0;

                result.documentInfo.pageCount = (
                    nodes[i].attributes['meta:page-count'] && !isNaN(nodes[i].attributes['meta:page-count'].value)
                ) ? +nodes[i].attributes['meta:page-count'].value : 0;

                result.documentInfo.paragraphCount = (
                    nodes[i].attributes['meta:paragraph-count'] &&
                        !isNaN(nodes[i].attributes['meta:paragraph-count'].value)
                ) ? +nodes[i].attributes['meta:paragraph-count'].value : 0;

                result.documentInfo.wordsCount = (
                    nodes[i].attributes['meta:word-count'] &&
                        !isNaN(nodes[i].attributes['meta:word-count'].value)
                ) ? +nodes[i].attributes['meta:word-count'].value : 0;

                result.documentInfo.characterCount = (
                    nodes[i].attributes['meta:character-count'] &&
                        !isNaN(nodes[i].attributes['meta:character-count'].value)
                ) ? +nodes[i].attributes['meta:character-count'].value : 0;

                break;
            }
        }
    }

    return result;
};