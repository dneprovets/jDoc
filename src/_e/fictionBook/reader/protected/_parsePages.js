/**
 *
 * @param xml
 * @param documentData
 * @param list
 * @private
 */
FictionBook.prototype._parsePages = function (xml, documentData, list) {
    var i,
        nodes = $.children(xml),
        len = nodes.length,
        childElement;

    for (i = 0; i < len; i++) {
        if (nodes[i].localName === "title") {
            list.push(this._prepareBlock(nodes[i], documentData));
        } else if (nodes[i].localName === "section") {
            this._parsePages(nodes[i], documentData, list);
        } else if (nodes[i].localName) {
            list.push(
                this._parseBlockElement({
                    node: nodes[i],
                    documentData: documentData
                })
            );
        }
    }

    if (xml.attributes.id && xml.attributes.id.value) {
        childElement = document.createElement('a');
        childElement.setAttribute("name", xml.attributes.id.value);
        list[list.length - 1].appendChild(childElement);
    }
};