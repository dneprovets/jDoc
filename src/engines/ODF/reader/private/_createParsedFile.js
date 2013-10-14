/**
 * @param fileEntries {Array}
 * @param callback {function}
 * @returns {null}
 * @private
 */
jDoc.engines.ODF.prototype._createParsedFile = function (fileEntries, callback) {
    if (this.isTextDocument()) {
        this._createParsedFileFromTextDocument.apply(this, arguments);
    }

    return null;
};