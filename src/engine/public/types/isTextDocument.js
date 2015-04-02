/**
 *
 * @returns {boolean}
 */
jDoc.Engine.prototype.isTextDocument = {
    get: function () {
        return !!(this.fileType && this.fileType.isTextDocument);
    }
};