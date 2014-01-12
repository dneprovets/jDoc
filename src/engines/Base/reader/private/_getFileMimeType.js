/**
 *
 * @param filename
 * @returns {string}
 * @private
 */
jDoc.Engine.prototype._getFileMimeType = function (filename) {
    var extension = (/[a-z]+$/i).exec(filename),
        result = "";

    if (extension) {
        extension = extension[0].toLowerCase();

        switch (extension) {
        case "png":
            result = "image/png";
            break;
        case "jpg":
        case "jpeg":
            result = "image/jpeg";
            break;
        case "gif":
            result = "image/gif";
            break;
        }
    }
    return result;
};