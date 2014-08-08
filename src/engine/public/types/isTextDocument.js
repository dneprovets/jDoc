/**
 *
 * @returns {boolean}
 */
jDoc.Engine.prototype.isTextDocument = function () {
    return !!(this.options.fileType && this.options.fileType.isTextDocument);
};