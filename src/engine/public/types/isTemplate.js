/**
 *
 * @returns {boolean}
 */
jDoc.Engine.prototype.isTemplate = {
    get () {
        return !!(this.fileType && this.fileType.isTemplate);
    }
};