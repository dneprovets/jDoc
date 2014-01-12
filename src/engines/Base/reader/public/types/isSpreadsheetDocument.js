/**
 *
 * @returns {boolean}
 */
jDoc.Engine.prototype.isSpreadsheetDocument = function () {
    return !!(this.options.fileType && this.options.fileType.isSpreadsheetDocument);
};