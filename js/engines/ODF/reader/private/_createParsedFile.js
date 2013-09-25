/**
 * @param fileEntries {Array}
 * @param callback {function}
 * @returns {null}
 * @private
 */
jDoc.Engines.ODF.prototype._createParsedFile = function (fileEntries, callback) {
    if (this.isTextDocument()) {
        this._createParsedFileFromTextDocument.apply(this, arguments);
    }

    return null;
};