/**
 *
 * @returns {boolean}
 */
jDoc.Engine.prototype.isTextDocument = {
    get () {
        return !!(this.fileType && this.fileType.isTextDocument);
    }
};