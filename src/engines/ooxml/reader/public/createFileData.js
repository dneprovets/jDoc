/**
 * @param fileEntries {Array}
 * @returns {null}
 * @private
 */
OOXML.prototype.createFileData = function (fileEntries) {
    if (this.isTextDocument) {
        return this._createFileDataFromTextDocument.apply(this, arguments);
    }

    return Promise.reject(this.errors.invalidFileType.message);
};