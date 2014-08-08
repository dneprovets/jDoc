jDoc.Engine.prototype.isTextDocumentMaster = function () {
    return (this.options.fileType && !!this.options.fileType.isTextDocumentMaster);
};