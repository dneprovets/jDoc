/**
 * @description get type of file
 * @param file
 * @return {null|String}
 * @private
 */
jDoc.Engine.prototype.getFileType = function (file) {
    var result = null,
        fileExtensions,
        mimeTypes,
        fileNameData = String(file.name).split('.'),
        parsers = Array.isArray(this.fileTypeParsers) ? this.fileTypeParsers : [],
        fileTypesCount = parsers.length,
        len = fileNameData.length,
        extension,
        e,
        found = false,
        i;

    extension = len > 1 ? fileNameData[len - 1] : '';

    for (i = 0; i < fileTypesCount; i++) {
        mimeTypes = parsers[i].mime;
        if (!(mimeTypes instanceof Array)) {
            mimeTypes = [mimeTypes];
        }

        for (e = mimeTypes.length - 1; e >= 0; e--) {
            if (file.type.indexOf(mimeTypes[e]) >= 0) {
                found = true;
                break;
            }
        }

        // if not found by mime type find by file extension
        if (!found) {
            fileExtensions = parsers[i].extension;

            if (!Array.isArray(fileExtensions)) {
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
            result = parsers[i];
            break;
        }
    }

    return result;
};