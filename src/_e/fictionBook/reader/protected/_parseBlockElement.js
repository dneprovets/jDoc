/**
 *
 * @param options
 * @private
 */
FictionBook.prototype._parseBlockElement = function (options) {
    var result,
        node = options.node;

    switch (node.localName) {
        case "p":
            result = this._parseParagraph({
                node: node,
                documentData: options.documentData
            });
            break;
        case "empty-line":
            result = {
                options: {
                    isEmptyLine: true
                }
            };
            break;
        case "subtitle":
            result = this._parseParagraph({
                node: node,
                documentData: options.documentData
            });
            result.css.textAlign = "center";
            break;
        case "image":
            result = this._prepareImage({
                node: node,
                documentData: options.documentData
            });
            break;
        default:
            result = this._prepareBlock(node, options.documentData);
    }

    return result;
};