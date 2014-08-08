/**
 *
 * @returns {boolean}
 */
jDoc.Engine.prototype.isTemplate = function () {
    return !!(this.options.fileType && this.options.fileType.isTemplate);
};