/**
 *
 * @returns {boolean}
 */
jDoc.Engine.prototype.isFormulaDocument = function () {
    return !!(this.options.fileType && this.options.fileType.isFormulaDocument);
};