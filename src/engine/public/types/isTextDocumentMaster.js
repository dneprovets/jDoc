jDoc.Engine.prototype.isTextDocumentMaster = {
    get: function () {
        return (this.fileType && !!this.fileType.isTextDocumentMaster);
    }
};