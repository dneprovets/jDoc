/**
 * @param fileEntries {Array}
 * @param callback {function}
 * @returns {null}
 * @private
 */
OOXML.prototype.createFileData = function (fileEntries, callback) {
    if (this.isTextDocument()) {
        this._createFileDataFromTextDocument.apply(this, arguments);
    }

    return null;
};