jDoc.Engine.prototype.isTextDocumentMasterWeb = {
    get: function () {
        return (this.fileType && !!this.fileType.isTextDocumentMasterWeb);
    }
};