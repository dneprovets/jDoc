jDoc.Engine.prototype.isSpreadsheetDocument = {
    get () {
        return !!(this.fileType && this.fileType.isSpreadsheetDocument);
    }
};