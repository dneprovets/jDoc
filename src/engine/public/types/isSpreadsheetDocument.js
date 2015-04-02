jDoc.Engine.prototype.isSpreadsheetDocument = {
    get: function () {
        return !!(this.fileType && this.fileType.isSpreadsheetDocument);
    }
};