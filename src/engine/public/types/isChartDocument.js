/**
 *
 * @returns {boolean}
 */
jDoc.Engine.prototype.isChartDocument = function () {
    return !!(this.options.fileType && this.options.fileType.isChartDocument);
};