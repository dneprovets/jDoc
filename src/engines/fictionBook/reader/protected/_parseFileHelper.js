/**
 *
 * @param text
 * @private
 */
FictionBook.prototype._parseFileHelper = function (text) {
    var domParser = new DOMParser();

    this.createFileData(domParser.parseFromString(text, "application/xml"), function (fileData) {
        this.trigger('parse', fileData);
        this.trigger('parseend');
    });
};