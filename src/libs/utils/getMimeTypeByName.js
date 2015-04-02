const mimeTypesByExtension = {
    "png": "image/png",
    "jpg": "image/jpeg",
    "jpeg": "image/jpeg",
    "gif": "image/gif"
};
/**
 *
 * @param filename
 * @returns {string}
 */
function getMimeTypeByName (filename) {
    var extensionData = (/[A-Za-z]+$/).exec(filename),
        defaultType = "";

    if (extensionData) {
        return mimeTypesByExtension[extensionData[0].toLowerCase()] || defaultType;
    }

    return defaultType;
}