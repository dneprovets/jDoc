/**
 * @description get type of file
 * @param file
 * @return {null|String}
 * @private
 */
jDoc.Engine.prototype._getFileType = function (file) {
    var result = null,
        fileExtensions,
        mimeTypes,
        extension = String(file.name).split('.'),
        fileTypesCount = this._fileTypeParsers.length,
        e,
        found = false,
        i;

    extension = extension[extension.length - 1];

    for (i = 0; i < fileTypesCount; i++) {
        if (file.type) {
            mimeTypes = this._fileTypeParsers[i].mime;
            if (!(mimeTypes instanceof Array)) {
                mimeTypes = [mimeTypes];
            }

            for (e = mimeTypes.length - 1; e >= 0; e--) {
                if (file.type.indexOf(mimeTypes[e]) >= 0) {
                    found = true;
                    break;
                }
            }
        }

        // if not found by mime type find by file extension
        if (!found && extension) {
            fileExtensions = this._fileTypeParsers[i].extension;
            if (!(fileExtensions instanceof Array)) {
                fileExtensions = [fileExtensions];
            }

            for (e = fileExtensions.length - 1; e >= 0; e--) {
                if (extension.indexOf(fileExtensions[e]) >= 0) {
                    found = true;
                    break;
                }
            }
        }

        if (found) {
            result = this._fileTypeParsers[i];
            break;
        }
    }
    return result;
};