jDoc.Engine.prototype.isPresentationDocument = {
    get () {
        return !!(this.fileType && this.fileType.isPresentationDocument);
    }
};