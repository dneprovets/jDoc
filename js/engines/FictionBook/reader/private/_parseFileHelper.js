/**
 *
 * @param text
 * @param options
 * @private
 */
jDoc.Engines.FictionBook.prototype._parseFileHelper = function (text, options) {
    var domParser = new DOMParser();

    this._createParsedFile(domParser.parseFromString(text, "application/xml"), function (parsedFile) {
        if (typeof options.success === 'function') {
            options.success(parsedFile);
        }
        if (typeof options.complete === 'function') {
            options.complete();
        }
    });
};