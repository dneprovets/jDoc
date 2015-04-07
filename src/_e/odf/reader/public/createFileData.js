/**
 * @param fileEntries {Array}
 * @param callback {function}
 * @returns {null}
 * @private
 */
ODF.prototype.createFileData = function (fileEntries, callback) {
    if (this.isTextDocument()) {
        this.createFileDataFromTextDocument.apply(this, arguments);
    }

    return null;
};