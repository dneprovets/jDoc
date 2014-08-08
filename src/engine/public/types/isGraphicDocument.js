/**
 *
 * @returns {boolean}
 */
jDoc.Engine.prototype.isGraphicDocument = function () {
    return !!(this.options.fileType && this.options.fileType.isGraphicDocument);
};