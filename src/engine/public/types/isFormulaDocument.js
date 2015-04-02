jDoc.Engine.prototype.isFormulaDocument = {
    get () {
        return !!(this.fileType && this.fileType.isFormulaDocument);
    }
};