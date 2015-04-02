/**
 *
 * @param text
 * @private
 */
FictionBook.prototype._parseFileHelper = function (text) {
    var domParser = new DOMParser();

    return this.createFileData(domParser.parseFromString(text, "application/xml"));
};