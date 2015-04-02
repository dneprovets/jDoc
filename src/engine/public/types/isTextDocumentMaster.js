jDoc.Engine.prototype.isTextDocumentMaster = {
    get () {
        return (this.fileType && !!this.fileType.isTextDocumentMaster);
    }
};