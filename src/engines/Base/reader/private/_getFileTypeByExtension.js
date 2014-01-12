/**
 *
 * @param str
 * @return {Object}
 * @private
 */
jDoc.Engine.prototype._getFileTypeByExtension = function (str) {
    return {
        isImage: (/.jpeg|.jpg/i).test(str)
    };
};