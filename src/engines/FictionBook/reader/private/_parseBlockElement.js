/**
 *
 * @param options
 * @private
 */
jDoc.engines.FictionBook.prototype._parseBlockElement = function (options) {
    var result;

    switch (options.node.localName) {
        case "p":
            result = this._parseParagraph({
                node: options.node,
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
                node: options.node,
                documentData: options.documentData
            });
            result.css.textAlign = "center";
            break;
        case "image":
            result = this._prepareImage({
                node: options.node,
                documentData: options.documentData
            });
            break;
        default:
            result = this._prepareBlock(options.node, options.documentData);
    }

    return result;
};