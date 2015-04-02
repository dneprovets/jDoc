jDoc.Engine.prototype.isTextDocumentMasterWeb = {
    get () {
        return (this.fileType && !!this.fileType.isTextDocumentMasterWeb);
    }
};