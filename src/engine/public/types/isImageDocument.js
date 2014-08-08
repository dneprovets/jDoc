/**
 *
 * @returns {boolean}
 */
jDoc.Engine.prototype.isImageDocument = function () {
    return !!(this.options.fileType && this.options.fileType.isImageDocument);
};