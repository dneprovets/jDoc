/**
 *
 * @returns {boolean}
 */
jDoc.Engine.prototype.isTemplate = {
    get: function () {
        return !!(this.fileType && this.fileType.isTemplate);
    }
};