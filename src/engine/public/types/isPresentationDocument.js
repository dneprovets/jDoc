/**
 *
 * @returns {boolean}
 */
jDoc.Engine.prototype.isPresentationDocument = function () {
    return !!(this.options.fileType && this.options.fileType.isPresentationDocument);
};