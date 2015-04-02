jDoc.Engine.prototype.isFormulaDocument = {
    get: function () {
        return !!(this.fileType && this.fileType.isFormulaDocument);
    }
};