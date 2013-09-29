/**
 * @param xml
 * @param documentData
 * @return {Object}
 * @private
 */
jDoc.Engines.FictionBook.prototype._parseFileInfo = function (xml, documentData) {
    var info = {},
        nodes = jDoc.DOM.children(xml);
    var len = nodes.length;
    var i;

    for (i = len - 1; i >= 0; i--) {
        switch (nodes[i].localName) {
            case "genre":
                info.genre = nodes[i].textContent || "";
                break;
            case "book-title":
                info.title = nodes[i].textContent || "";
                break;
            case "lang":
                info.language = nodes[i].textContent || "";
                break;
            case "src-lang":
                info.sourceLanguage = nodes[i].textContent || "";
                break;
            case "author":
                info.author = this._getPersonInfo(nodes[i]);
                break;
            case "translator":
                info.translator = this._getPersonInfo(nodes[i]);
                break;
            case "annotation":
                info.annotation = this._prepareBlock(nodes[i], documentData);
                break;
            case "date":
                info.date = nodes[i].textContent || "";
                break;
            case "coverpage":
                var imageNode = nodes[i].querySelector('image');
                info.coverpage = {
                    image: imageNode.attributes['l:href'] ? (imageNode.attributes['l:href'].value || "").replace("#", '') : ""
                };
                break;
            case "sequence":
                info.sequence = {
                    name: nodes[i].attributes.name ? nodes[i].attributes.name.value || "" : "",
                    number: nodes[i].attributes.number ? (
                        isNaN(nodes[i].attributes.number.value) ? 0 : +nodes[i].attributes.number.value
                        ) : 0
                };
                break;
        }
    }

    return info;
};