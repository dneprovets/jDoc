/**
 * @description get type of file
 * @param file
 * @return {null|String}
 * @private
 */
export default {
    value (file) {
        var result = null,
            fileNameData = String(file.name).split('.'),
            parsers = Array.isArray(this.fileTypeParsers) ? this.fileTypeParsers : [],
            fileTypesCount = parsers.length,
            len = fileNameData.length,
            extension,
            found = false;

        extension = len > 1 ? fileNameData[len - 1] : '';

        for (let i = 0; i < fileTypesCount; i++) {
            let mimeTypes = parsers[i].mime;

            if (!(mimeTypes instanceof Array)) {
                mimeTypes = [mimeTypes];
            }

            let e = mimeTypes.length;

            while (e--) {
                if (file.type.indexOf(mimeTypes[e]) >= 0) {
                    found = true;
                    break;
                }
            }

            // if not found by mime type find by file extension
            if (!found) {
                let fileExtensions = parsers[i].extension;

                if (!Array.isArray(fileExtensions)) {
                    fileExtensions = [fileExtensions];
                }

                e = fileExtensions.length;

                while (e--) {
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
    }
};